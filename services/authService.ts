import { BASE_URL } from "@/lib/client";
import {
  LoginProps,
  ResetPassword,
  ResetPasswordConfirm,
  Signup,
  User,
} from "@/types/type";

class AuthService {
  async login(data: LoginProps) {
    const response = await fetch(`${BASE_URL}/accounts/auth/jwt/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json(); // Return parsed JSON response
  }

  async getUser(token: string): Promise<User> {
    const response = await fetch(`${BASE_URL}/accounts/auth/users/me/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    const userData: User = {
      ...data,
      first_name: data.first_name || "",
      last_name: data.last_name || "",
      name: data.name || `${data.first_name} ${data.last_name}`.trim(),
    };

    return userData;
  }

  async signup(data: Signup) {
    const response = await fetch(`${BASE_URL}/accounts/auth/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  }

  async activate(payload: { uid: string; token: string }) {
    const response = await fetch(
      `${BASE_URL}/accounts/auth/users/activation/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.detail || "Activation failed");
    }

    // If successful, return the payload
    return {
      success: true,
      uid: payload.uid,
      token: payload.token,
    };
  }

  async resetPassword(data: ResetPassword) {
    const response = await fetch(
      `${BASE_URL}/accounts/auth/users/reset_password/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    return response.json;
  }

  async resetPasswordConfirm(data: ResetPasswordConfirm) {
    const response = await fetch(
      `${BASE_URL}/accounts/auth/users/reset_password_confirm/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    return response.json();
  }
}

export const authService = new AuthService();
