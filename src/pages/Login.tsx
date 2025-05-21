
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { BookOpen, User, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

const Login = () => {
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      await login(values.email, values.password);
      toast({
        title: "Login successful",
        description: "Welcome back to your BookShelf!",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Please check your email and password and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = (email: string) => {
    form.setValue("email", email);
    form.setValue("password", "password123");
    form.handleSubmit(onSubmit)();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-book-cream dark:bg-sidebar p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-6 w-6 text-book-amber" />
            <span className="font-serif font-bold text-2xl">BookShelf</span>
          </div>
          <CardTitle className="text-2xl font-serif text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">
            Log in to your account to access your books
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="form" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="form" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Regular Login
              </TabsTrigger>
              <TabsTrigger value="quick" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Quick Access
              </TabsTrigger>
            </TabsList>
            <TabsContent value="form">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="******" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-book-amber hover:bg-amber-600" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Log in"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
            <TabsContent value="quick">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <Button 
                    variant="outline" 
                    className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/10 border-amber-200 dark:border-amber-800/30 hover:bg-amber-200"
                    onClick={() => handleQuickLogin("user@example.com")}
                  >
                    <User className="mr-2 h-4 w-4 text-amber-600" />
                    Login as User
                  </Button>
                  <Button 
                    variant="outline"
                    className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 border-blue-200 dark:border-blue-800/30 hover:bg-blue-200"
                    onClick={() => handleQuickLogin("admin@example.com")}
                  >
                    <Shield className="mr-2 h-4 w-4 text-blue-600" />
                    Login as Admin
                  </Button>
                </div>
                <div className="text-xs text-center text-muted-foreground mt-2">
                  <p>Click one of the buttons above for quick access</p>
                  <p>Admin email: admin@example.com</p>
                  <p>User email: user@example.com</p>
                  <p>Password for both: password123</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-center text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-book-amber hover:text-amber-600 font-medium">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
