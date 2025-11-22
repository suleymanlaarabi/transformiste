import {
  Accordion,
  Button,
  Checkbox,
  ColorPicker,
  HStack,
  Span,
  VStack,
} from "@chakra-ui/react";
import { useCallback, type ReactNode } from "react";
import { Node, type NodeFC, type NodeProps } from "./Node";
import { useGLTF } from "@react-three/drei";
import { useAtom } from "jotai";
import { carroserieSettingsAtom, settingsAtom } from "../../atoms";
import useKeyDown from "../../hooks/useEvent";
import { client } from "../../apiClient";
import { useUser } from "../../hooks/useUser";
import { useDebouncedCallback } from "@tanstack/react-pacer";

type LeftPanelProps = {
  spawnMesh: (node: NodeFC, name: string) => void;
};

export default function LeftPanel({ spawnMesh }: LeftPanelProps) {
  return (
    <VStack w={"360px"} ml={4} gap={4} alignItems="stretch">
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
                        spawnMesh(
                          (props) => el.node({ ...props, name: el.name }),
                          el.name
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

      <Accordion.Root collapsible defaultValue={["body"]}>
        <Accordion.Item value={"body"}>
          <Accordion.ItemTrigger>
            <Span flex="1">Body Color</Span>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>
              <BodyColor />
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
        <Accordion.Item value={"edge"}>
          <Accordion.ItemTrigger>
            <Span flex="1">Edge Color</Span>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>
              <EdgeColor />
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>
      <GizmoCheckBox />
    </VStack>
  );
}

function EdgeColor() {
  const [carroserieSettings, setCarroserieSettings] = useAtom(
    carroserieSettingsAtom
  );
  const user = useUser();

  const debounced = useDebouncedCallback(
    () => {
      client["set-color"].post({
        name: user.name,
        body: carroserieSettings.bodyColor.toString("rgb"),
        edge: carroserieSettings.edge.toString("rgb"),
      });
    },
    {
      wait: 500,
    }
  );
  return (
    <ColorPicker.Root
      open
      defaultValue={carroserieSettings.edge}
      onValueChange={(e) => {
        setCarroserieSettings((prev) => ({
          ...prev,
          edge: e.value,
        }));
        debounced();
      }}
    >
      <ColorPicker.HiddenInput />
      <ColorPicker.Content animation="none" shadow="none" padding="0">
        <ColorPicker.Area />
        <HStack>
          <ColorPicker.EyeDropper size="xs" variant="outline" />
          <ColorPicker.Sliders />
          <ColorPicker.ValueSwatch />
        </HStack>
      </ColorPicker.Content>
    </ColorPicker.Root>
  );
}

function BodyColor() {
  const [carroserieSettings, setCarroserieSettings] = useAtom(
    carroserieSettingsAtom
  );
  const user = useUser();

  const debounced = useDebouncedCallback(
    () => {
      client["set-color"].post({
        name: user.name,
        body: carroserieSettings.bodyColor.toString("rgb"),
        edge: carroserieSettings.edge.toString("rgb"),
      });
    },
    {
      wait: 500,
    }
  );

  return (
    <ColorPicker.Root
      open
      defaultValue={carroserieSettings.bodyColor}
      onValueChange={(e) => {
        setCarroserieSettings((prev) => ({
          ...prev,
          bodyColor: e.value,
        }));
        debounced();
      }}
    >
      <ColorPicker.HiddenInput />
      <ColorPicker.Content animation="none" shadow="none" padding="0">
        <ColorPicker.Area />
        <HStack>
          <ColorPicker.EyeDropper size="xs" variant="outline" />
          <ColorPicker.Sliders />
          <ColorPicker.ValueSwatch />
        </HStack>
      </ColorPicker.Content>
    </ColorPicker.Root>
  );
}

function GizmoCheckBox() {
  const [settings, setSettings] = useAtom(settingsAtom);
  useKeyDown(
    "g",
    useCallback(() => {
      setSettings({
        gizmo: !settings.gizmo,
      });
    }, [setSettings, settings])
  );
  return (
    <Checkbox.Root
      checked={settings.gizmo}
      onCheckedChange={(e) => {
        setSettings({
          gizmo: !!e.checked,
        });
      }}
    >
      <Checkbox.HiddenInput />
      <Checkbox.Control />
      <Checkbox.Label>Accept terms and conditions</Checkbox.Label>
    </Checkbox.Root>
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

const assets = [
  "PresetRoueImport",
  "RoueBasique",
  "CarosserieBasique",
] as const;

assets.forEach((el) => {
  useGLTF.preload(`/assets/${el}.glb`);
});

const temp: Item[] = [
  {
    name: "PresetRoueImport",
    node: Node,
  },
  {
    name: "RoueBasique",
    node: Node,
  },
  {
    name: "CarosserieBasique",
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
