"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Lock,
  User,
  Loader2,
  AlertCircle,
  Github,
  EyeOff,
  Eye,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, State } from "@/store/store";
import { signup } from "@/slices/authSlice";
import { toast } from "sonner";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
  });
  const dispatch = useDispatch<Dispatch>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { loading, error } = useSelector((state: State) => state.auth);

  const validations = {
    minLength: formData.password.length >= 8,
    hasUpperCase: /[A-Z]/.test(formData.password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
    passwordsMatch: formData.password === formData.re_password,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!Object.values(validations).every(Boolean)) {
      return;
    }

    try {
      const signupData = {
        name: FormData.name,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password,
        re_password: formData.re_password,
      };

      await dispatch(signup(signupData)).unwrap();
      toast.success("Account created successfully! Please log in.");
      router.push("/login");
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
            <Github className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Create an account
          </CardTitle>
          <CardDescription>Enter your details to get started</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="first_name"
                  type="text"
                  placeholder="Enter your first name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="pl-10"
                  required
                  disabled={loading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="last_name"
                  type="text"
                  placeholder="Enter your last name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="pl-10"
                  required
                  disabled={loading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10"
                  required
                  disabled={loading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10"
                  required
                  disabled={loading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {formData.password && (
                <div className="space-y-2 text-sm mt-2">
                  <div
                    className={`flex items-center gap-2 ${
                      validations.minLength ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <div
                      className={`h-1.5 w-1.5 rounded-full ${
                        validations.minLength ? "bg-green-600" : "bg-red-600"
                      }`}
                    />
                    At least 8 characters
                  </div>
                  <div
                    className={`flex items-center gap-2 ${
                      validations.hasUpperCase
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    <div
                      className={`h-1.5 w-1.5 rounded-full ${
                        validations.hasUpperCase ? "bg-green-600" : "bg-red-600"
                      }`}
                    />
                    One uppercase character
                  </div>
                  <div
                    className={`flex items-center gap-2 ${
                      validations.hasSpecialChar
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    <div
                      className={`h-1.5 w-1.5 rounded-full ${
                        validations.hasSpecialChar
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    />
                    One special character
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm_password">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="re_password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={formData.re_password}
                  onChange={handleChange}
                  className="pl-10"
                  required
                  disabled={loading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {formData.re_password && (
                <div
                  className={`flex items-center gap-2 text-sm mt-2 ${
                    validations.passwordsMatch
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  <div
                    className={`h-1.5 w-1.5 rounded-full ${
                      validations.passwordsMatch ? "bg-green-600" : "bg-red-600"
                    }`}
                  />
                  Passwords match
                </div>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {error && (
            <Alert
              className={
                error === "error"
                  ? "border-red-200 bg-red-50"
                  : "border-green-200 bg-green-50"
              }
            >
              {error === "error" && <AlertCircle className="h-4 w-4" />}
              <AlertDescription
                className={
                  error === "error" ? "text-red-800" : "text-green-800"
                }
              >
                {error}
              </AlertDescription>
            </Alert>
          )}

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Button
              variant="link"
              className="p-0 h-auto font-normal"
              onClick={() => router.push("/login")}
            >
              Sign in
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
