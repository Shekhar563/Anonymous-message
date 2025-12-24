import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import sendVerificationEmail from "@/helpers/sendVerificationEmail";

export async function POST(req: Request) {
    console.log("Signup request received");
  try {
    await dbConnect();

    const { username, email, password } = await req.json();

    // 1️⃣ Check username
    const userByUsername = await UserModel.findOne({ username });
    if (userByUsername) {
      return NextResponse.json(
        { success: false, message: "Username taken" },
        { status: 400 }
      );
    }

    // 2️⃣ Check email
    const userByEmail = await UserModel.findOne({ email });
    if (userByEmail) {
      return NextResponse.json(
        { success: false, message: "Email already used" },
        { status: 400 }
      );
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Generate verification code
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verifyCodeExpiry = new Date(Date.now() + 10 * 60 * 1000);

    // 5️⃣ Create user
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

    // 6️⃣ SEND EMAIL  ← THIS IS WHERE IT GOES
    const emailRes = await sendVerificationEmail(email, username, verifyCode);

    // 7️⃣ Check email result
    if (!emailRes.data) {
      return NextResponse.json(
        { success: false, message: emailRes.error || "Failed to send verification email" },
        { status: 500 }
      );
    }

    // 8️⃣ Final success response
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
