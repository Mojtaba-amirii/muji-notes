import AuthForm from "@/components/auth-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function SignUpPage() {
  return (
    <section className="mt-20 flex flex-1 flex-col items-center">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="mb-4">
          <CardTitle className="text-center text-2xl font-bold">
            Create an Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AuthForm type="signup" />
        </CardContent>
      </Card>
    </section>
  );
}

export default SignUpPage;
