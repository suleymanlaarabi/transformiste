import { Accordion, Button, Span, VStack } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { Node, type NodeFC, type NodeProps } from "./Node";
import { useGLTF } from "@react-three/drei";

type LeftPanelProps = {
  spawnMesh: (node: NodeFC) => void;
};

export default function LeftPanel({ spawnMesh }: LeftPanelProps) {
  return (
    <VStack w={"200px"} ml={4}>
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
                  {item.items.map((el, i) => (
                    <Button
                      key={i}
                      variant={"outline"}
                      w={"full"}
                      onClick={() =>
                        spawnMesh((props) =>
                          el.node({ ...props, name: el.name })
                        )
                      }
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

const assets = ["PresetRoueImport"] as const;

assets.forEach((el) => {
  useGLTF.preload(`/assets/${el}.glb`);
});

const temp: Item[] = [
  {
    name: "PresetRoueImport",
    node: Node,
  },
  {
    name: "PresetRoueImport",
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
