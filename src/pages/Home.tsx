import { userAtom, type User } from "../atoms";
import { Button, Flex, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { useSetAtom } from "jotai";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { client } from "../apiClient";

export default function Home() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<User>();

  const setUser = useSetAtom(userAtom);

  const onSubmit = handleSubmit((user) => {
    client.register.post(user).then(() => {
      setUser(user);
      navigate("/game");
    });
  });

  return (
    <Flex
      h={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      direction={"column"}
      as={"form"}
      onSubmit={onSubmit}
    >
      <Heading>Transformiste</Heading>
      <VStack mt={2}>
        <Input
          placeholder="username"
          {...register("name", { required: true })}
        />
        <Text color={"red"}>
          {formState.errors.name?.type === "required"
            ? "Please set a username"
            : null}
        </Text>
        <Button w={"full"} type="submit">
          Play
        </Button>
      </VStack>
    </Flex>
  );
}
