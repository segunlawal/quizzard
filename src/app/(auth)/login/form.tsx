'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/components/ui/use-toast';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must be 8 or more characters long' }),
});

export const LoginForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [showPassword, setShowPassword] = useState('password');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setButtonDisabled(true);
    const { email, password } = values;

    try {
      const res = await signIn('credentials', {
        email,
        password,
        callbackUrl,
        redirect: false,
      });
      if (!res?.error) {
        router.push(callbackUrl || '/dashboard');
        toast({
          action: (
            <span className="text-blue w-full flex items-center">
              Login successful
            </span>
          ),
        });
      } else {
        toast({
          variant: 'destructive',
          description: 'Invalid email or password',
        });
      }

      setButtonDisabled(false);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        description: 'Error logging in',
      });
      setButtonDisabled(false);
    }
  };

  const handleToggle = (): void => {
    showPassword === 'password'
      ? setShowPassword('text')
      : setShowPassword('password');
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mt-5">
                <FormLabel className="">Email</FormLabel>
                <FormControl>
                  <div>
                    <Input
                      type="email"
                      autoComplete="off"
                      placeholder="Email address"
                      {...field}
                      className="rounded-lg py-3 -mt-2 px-2 placeholder:text-sm placeholder:opacity-80 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </FormControl>
                <FormMessage className="" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mt-5">
                <FormLabel className="">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      autoComplete="off"
                      placeholder="Password"
                      {...field}
                      type={showPassword}
                      className="rounded-lg py-3 -mt-2 px-2 placeholder:text-sm placeholder:opacity-80 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    {showPassword === 'password' ? (
                      <EyeIcon
                        data-testid="eye-icon"
                        onClick={handleToggle}
                        className="cursor-pointer absolute top-[33%] right-[3%] w-4"
                      />
                    ) : (
                      <EyeSlashIcon
                        data-testid="eye-slash-icon"
                        onClick={handleToggle}
                        className="cursor-pointer absolute top-[33%] right-[3%] w-4"
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage className="" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full mt-5 rounded-lg bg-blue hover:bg-blue py-3 disabled:bg-gray"
            disabled={buttonDisabled}
          >
            Log In
          </Button>

          <div className="flex items-center gap-x-2 mt-7">
            <hr className="border-[0.1px] border-opacity-50 border-blue w-full" />
            <h2 className="text-blue whitespace-nowrap">Sign up with</h2>
            <hr className="border-[0.1px] border-opacity-50 border-blue w-full" />
          </div>
        </form>
      </Form>
    </div>
  );
};
