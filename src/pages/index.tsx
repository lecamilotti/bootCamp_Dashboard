import { Button, Flex, Stack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/Form/Input";

type SigInFormData = {
  email: string;
  password: string;
}

export default function SignIn() {
  const {register, handleSubmit, formState} = useForm();

  const handleSignIn: SubmitHandler<SigInFormData> = async (values) =>{
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(values);

  }
  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >
      <Flex
        as="form"
        w='100%'
        maxW={360}
        bg="gray.700" 
        p="8" 
        borderRadius={8}
        flexDirection="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing={4}>
         <Input name="email" label="Email" type="email" {...register('email')}/>
         <Input name="password" label="Password" type="password" {...register('password')} />
        </Stack>
        <Button
          type='submit'
          mt={6}
          colorScheme="pink"
          size='lg'
          isLoading={formState.isSubmitting}
        >Enter</Button>
      
      </Flex>
    </Flex>
  );
}
