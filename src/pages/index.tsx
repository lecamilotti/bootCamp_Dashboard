import { Button, Flex, Stack } from '@chakra-ui/react';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useRouter } from 'next/router'; // Import useRouter
import { Input } from '../components/Form/Input';
import { Logo } from '../components/Header/Logo';

type SignInFormData = {
  email: string;
  password: string;
  error?: FieldError;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required'),
});

export default function SignIn() {
  const router = useRouter(); // Initialize useRouter
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });
  const { errors } = formState;

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    try {
      const response = await axios.get('/api/users');
      const users = response.data.users;

      const user = users.find(
        (user: { email: string; password: string }) =>
          user.email === values.email && user.password === values.password
      );

      if (user) {
        // Successful login
        console.log('Login successful', user);
        router.push('/dashboard'); // Redirect to /dashboard
      } else {
        // Failed login
        console.log('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during sign in', error);
    }
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        direction="column"
        align="center"
        justify="center"
        mb={8}
      >

        <Logo isLogin={true}/>
  
      
      <Flex
        as="form"
        w="100%"
        maxW={360}
        bg="gray.700"
        p="8"
        borderRadius={8}
        flexDirection="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing={4}>
          <Input
            name="email"
            label="Email"
            type="email"
            error={errors.email}
            {...register('email')}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            error={errors.password}
            {...register('password')}
          />
        </Stack>
        <Button
          type="submit"
          mt={6}
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Enter
        </Button>
      </Flex>
      </Flex>
    </Flex>
  );
}
