import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/src/lib/dbConnect";
import UserModel from "@/src/model/User";
import sendVerificationEmail  from "@/src/helpers/sendVerificationEmail";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { username, email, password } = await req.json();

    const userByUsername = await UserModel.findOne({ username });
    if (userByUsername) {
      return NextResponse.json(
        { success: false, message: "Username taken" },
        { status: 400 }
      );
    }

    const userByEmail = await UserModel.findOne({ email });
    if (userByEmail) {
      return NextResponse.json(
        { success: false, message: "Email already used" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verifyCodeExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await UserModel.create({
      username,
      email,
      password: hashedPassword,
      verifyCode,
      verifyCodeExpiry,
      isVerified: false,
      isAcceptingMessages: true,
      messages: [],
    });

    const emailRes = await sendVerificationEmail(email, username, verifyCode);

    if (!emailRes?.success) {
      return NextResponse.json(
        { success: false, message: emailRes?.message || "Email failed" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Signup successful. Verify your email." },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
