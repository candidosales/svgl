import Head from "next/head";
import {
  chakra,
  Box,
  Flex,
  Badge,
  SimpleGrid,
  Button,
  Image,
  Container,
  Center,
  HStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Error from "components/error";
import { IoArrowBackOutline, IoCloudDownloadOutline } from "react-icons/io5";
import { BiLinkExternal } from "react-icons/bi";
import Link from "next/link";
import Show from "animations/show";
import Loader from "animations/loader";
import Hover from "animations/hover";

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export default function Icon() {
  const { query } = useRouter();
  const { data, error } = useSWR(
    () => query.id && `/api/search?id=${query.id}`,
    fetcher
  );

  if (error) return <Error />;
  if (!data) return <Loader />;

  return (
    <>
      <Head>
        <title>{data.title} - iconr</title>
      </Head>
      <Show delay="0">
        <Container
          maxW="100%"
          borderWidth="1px"
          borderRadius="30px"
        >
          <SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} spacing={0}>
            <Box py={{ base: "10", md: "24" }}>
              <Center>
                <Image
                  src={data.href}
                  alt={data.title}
                  w={{ base: "30%", md: "20%", lg: "30%" }}
                  fit="cover"
                  loading="lazy"
                />
              </Center>
            </Box>
            <Flex
              direction="column"
              alignItems="start"
              justifyContent="center"
              px={{ base: 4, lg: 4 }}
              py={{ base: "3", md: "0", lg: "10" }}
            >
              <chakra.h1
                mb={3}
                fontSize={{ base: "4xl", md: "4xl", lg: "5xl" }}
                fontWeight="semibold"
                lineHeight="shorter"
              >
                {data.title}
              </chakra.h1>
              <Flex direction={{ base: "column", md: "row" }} mt="2">
                <Hover>
                  <Link href={data.href} passHref>
                    <Button
                      leftIcon={<IoCloudDownloadOutline />}
                      colorScheme="black"
                      variant="outline"
                      bg="transparent"
                      fontWeight="light"
                      mr="2"
                    >
                      Download .svg
                    </Button>
                  </Link>
                </Hover>
                <Link href={data.url} passHref>
                  <Button
                    colorScheme="teal"
                    variant="outline"
                    fontWeight="light"
                    borderWidth="1px"
                    rightIcon={<BiLinkExternal />}
                  >
                    {data.title} website
                  </Button>
                </Link>
              </Flex>
            </Flex>
          </SimpleGrid>

          <Link href="/" passHref>
            <Button
              leftIcon={<IoArrowBackOutline />}
              colorScheme="twitter"
              variant="outline"
              fontWeight="bold"
              w="100%"
              border="0"
              mt="4"
              mb="4"
            >
              Continue discovering
            </Button>
          </Link>
        </Container>
      </Show>
    </>
  );
}
