import { connectDB } from "@/lib/databaseConnection";
import { response } from "@/lib/helperFunctions";
import { zSchema } from "@/lib/zodSchema";
import UserModel from "@/models/User.model";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();

    //validaiton schema
    const validationSchema = zSchema.pick({
      name: true,
      email: true,
      password: true,
    });
    const payload = await request.json();

    const validaitonData = validationSchema.safeParse(payload);

    if (!validaitonData.success) {
      return response(
        false,
        401,
        "Invaild or missing input filed",
        validaitonData.error
      );

      const { name, email, password } = validaitonData.data;

      //check already register user
      const checkUser = await UserModel.exists({ email });

      if (checkUser) {
        return response(false, 409, "User already registerd");
      }
      //new registration

      const NewRegistration = new UserModel({
        name,
        email,
        password,
      });

      await NewRegistration.save();

      const secret = new TextEncoder().encode(process.env.SECRET_KEY);
      const token = await new SignJWT({
        userId: NewRegistration._id,
      })
        .setIssuedAt()
        .setExpirationTime("1h")
        .setProtectedHeader("HS256")
        .sign(secret);
    }
  } catch (error) {}
}
