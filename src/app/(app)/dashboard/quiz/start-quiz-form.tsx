'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { categoryOptions } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  category: z.string().min(1, { message: 'Select a quiz' }),
  numberOfQuestions: z.coerce
    .number()
    .min(10, { message: 'Questions must be between 10 and 20' })
    .max(20, { message: 'Questions must be between 10 and 20' }),
});

const StartQuizForm = () => {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: '',
      numberOfQuestions: 10,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let categoryNumber;

    switch (values.category) {
      case 'all':
        categoryNumber = 0;
        break;
      case 'general':
        categoryNumber = 9;
        break;
      case 'sports':
        categoryNumber = 21;
        break;
      case 'history':
        categoryNumber = 23;
        break;
      case 'science':
        categoryNumber = 17;
        break;
      case 'entertainment':
        categoryNumber = 12;
        break;
    }
    router.push(
      `/dashboard/quiz/begin-quiz?category=${categoryNumber}&numberOfQuestions=${values.numberOfQuestions}`,
    );
  };

  return (
    <div className="shadow-md p-7 bg-white rounded-md mt-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="mt-5">
                <FormLabel className="">Category</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an available quiz" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((category) => (
                        <SelectItem
                          key={category.value}
                          value={category.value}
                          className="cursor-pointer"
                        >
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="numberOfQuestions"
            render={({ field }) => (
              <FormItem className="mt-5">
                <FormLabel className="">
                  Number of questions (10 to 20)
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    autoComplete="off"
                    placeholder="Number of Questions"
                    {...field}
                    className="rounded-lg py-3 px-2 placeholder:text-sm placeholder:opacity-80 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </FormControl>
                <FormMessage className="" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mt-5 rounded-lg bg-blue hover:bg-blue py-3 px-10 disabled:bg-gray"
            disabled={buttonDisabled}
          >
            Start Quiz
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default StartQuizForm;
