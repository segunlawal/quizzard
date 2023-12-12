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
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Full name must be 2 or more characters long' })
    .max(150),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must be 8 or more characters long' }),
});

export const RegisterForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState('password');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setButtonDisabled(true);
    const { fullName, email, password } = values;

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          name: fullName,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        toast({
          action: (
            <span className="text-blue w-full flex items-center">
              Registration successful
            </span>
          ),
        });
        router.push(`/login?email=${email}`);
        // redirect to dashboard
      } else {
        throw await res.json();
      }

      setButtonDisabled(false);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        description: error.error || 'Network Error',
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
            name="fullName"
            render={({ field }) => (
              <FormItem className="mt-5">
                <FormLabel className="">Username</FormLabel>
                <FormControl>
                  <div>
                    <Input
                      type="text"
                      placeholder="Username"
                      {...field}
                      className="rounded-lg py-3 -mt-1 px-2 placeholder:text-sm placeholder:opacity-80 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </FormControl>
                <FormMessage className="" />
              </FormItem>
            )}
          />

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
            Create Account
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
