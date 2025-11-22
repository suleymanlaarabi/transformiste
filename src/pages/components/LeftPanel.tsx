import { Accordion, Button, Span, VStack } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { Node, type NodeFC, type NodeProps } from "./Node";

type LeftPanelProps = {
  spawnMesh: (node: NodeFC) => void;
};

export default function LeftPanel({ spawnMesh }: LeftPanelProps) {
  return (
    <VStack w={"200px"}>
      <Accordion.Root collapsible defaultValue={["b"]}>
        {categories.map((item, index) => (
          <Accordion.Item key={index} value={item.value}>
            <Accordion.ItemTrigger>
              <Span flex="1">{item.title}</Span>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody>
                <VStack>
                  {item.items.map((el) => (
                    <Button
                      key={el.name}
                      variant={"outline"}
                      w={"full"}
                      onClick={() => spawnMesh(el.node)}
                    >
                      {el.name}
                    </Button>
                  ))}
                </VStack>
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </VStack>
  );
}

type Item = {
  name: string;
  node: (props: NodeProps) => ReactNode;
};

type Category = {
  value: string;
  title: string;
  items: Item[];
};

const temp: Item[] = [
  {
    name: "Epita",
    node: Node,
  },
  {
    name: "Eglou",
    node: Node,
  },
];

const categories: Category[] = [
  {
    value: "a",
    title: "Roues",
    items: temp,
  },
  {
    value: "b",
    title: "Carosserie",
    items: temp,
  },
  {
    value: "c",
    title: "Poignées",
    items: temp,
  },
];
