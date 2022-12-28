import {
  Card,
  Group,
  Badge,
  Image,
  Text,
  Box,
  Avatar,
  MantineColor,
  Anchor,
  Center,
  Button,
  useMantineTheme,
} from '@mantine/core';
import { getStatusColor } from '../utils';
import {
  IconUser,
  IconWallet,
  IconArrowNarrowUp,
  IconUsers,
} from '@tabler/icons';
import { IProject } from '@letscollab-nest/trait';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';
import { FC, ReactElement, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { AvatarWithPreview, LimitAvatarGroup } from '@letscollab/console-utils';

export interface PinnedProjectCardProps extends Partial<IProject> {
  hiddenCover?: boolean;
  hiddenMember?: boolean;
  actions?: ReactElement;
}

export const PinnedProjectCard: FC<PinnedProjectCardProps> = function (props) {
  const color: MantineColor = getStatusColor(props.status);
  const { id, hiddenCover, hiddenMember, actions } = props;
  const theme = useMantineTheme();

  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
  });

  useEffect(() => {
    if (!isDragging) {
      return;
    }

    document.body.style.cursor = 'grabbing';

    return () => {
      document.body.style.cursor = '';
    };
  }, [isDragging]);

  return (
    <Card
      style={{
        zIndex: isDragging ? 999 : 0,
        opacity: isDragging ? 0.8 : 1,
        border: '1px solid #E2E2E2',
        overflow: 'unset',
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      ref={setNodeRef}
      {...attributes}
      p="xs"
      pt={0}
    >
      <Center
        sx={{
          '&:hover': {
            cursor: 'grabbing',
          },
          touchAction: 'manipulation',
        }}
        {...listeners}
        ref={setActivatorNodeRef}
        style={{ height: 16 }}
      >
        <Box
          sx={{
            width: 50,
            height: 3,
            borderRadius: 10,
            background: theme.colors.gray[3],
          }}
        ></Box>
      </Center>
      <Group position="apart" mb={7}>
        <Group spacing={5}>
          <Anchor
            to={props.name}
            component={Link}
            reloadDocument={false}
            size="sm"
            style={{ color: '#228be6', fontWeight: 700 }}
          >
            {props.name}
          </Anchor>
        </Group>
        <Badge size="xs" color={color} variant="light">
          {props.status}
        </Badge>
      </Group>
      {!hiddenCover && (
        <Card.Section>
          <Image
            src={props.cover ? props.cover : '/images/project-cover.svg'}
            height={50}
            alt="cover"
          />
        </Card.Section>
      )}

      <Box style={{ height: 30 }}>
        <Text lineClamp={2} mt={10} style={{ color: '#777777', fontSize: 10 }}>
          {props.description}
        </Text>
      </Box>

      <Group mt={9} position="apart">
        {!hiddenMember && (
          <LimitAvatarGroup ml={-2} spacing="xs">
            {props.members.map((u, i) => {
              return (
                <AvatarWithPreview
                  radius="xl"
                  size="sm"
                  key={i}
                  src={u.avatar}
                  component="a"
                  href={u.profileUrl}
                >
                  <IconUser size={14} />
                </AvatarWithPreview>
              );
            })}
          </LimitAvatarGroup>
        )}
        {actions && <Center>{actions}</Center>}
      </Group>
      <Group mt={9} position="right">
        <Center>
          <Button
            color="dark"
            radius="xs"
            size="xs"
            style={{ padding: 0 }}
            compact
            variant="white"
          >
            <IconUsers size={13} />
            <Text ml={3} style={{ lineHeight: 1 }} lineClamp={1} size="xs">
              1011231211
            </Text>
          </Button>
          <Button
            ml={3}
            color="dark"
            radius="xs"
            size="xs"
            style={{ padding: 0 }}
            compact
            variant="white"
          >
            <IconArrowNarrowUp size={12} color="green" />
            <Text
              color="green"
              style={{ lineHeight: 1, fontSize: 10 }}
              lineClamp={1}
            >
              0
            </Text>
          </Button>
        </Center>
        <Center>
          <Button
            color="dark"
            radius="xs"
            size="xs"
            style={{ padding: 0 }}
            compact
            variant="white"
          >
            <IconWallet size={14} />
            <CurrencyFormat
              value={132321}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$'}
              renderText={(value) => (
                <Text ml={3} style={{ lineHeight: 1 }} lineClamp={1} size="xs">
                  {value}
                </Text>
              )}
            />
          </Button>
          <Button
            ml={3}
            color="dark"
            radius="xs"
            size="xs"
            style={{ padding: 0 }}
            compact
            variant="white"
          >
            <IconArrowNarrowUp size={12} color="green" />
            <Text
              color="green"
              style={{ lineHeight: 1, fontSize: 10 }}
              lineClamp={1}
            >
              0
            </Text>
          </Button>
        </Center>
      </Group>
    </Card>
  );
};

PinnedProjectCard.defaultProps = {
  hiddenCover: false,
  hiddenMember: false,
};
