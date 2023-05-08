import { Box } from '@mui/material';
import { styled } from '@mui/system';

import { FlexBetweenProp } from '../types/flex-between';

/* Styled Component */
export const FlexBetween = styled(Box)<FlexBetweenProp>(
  ({ backgroundColor }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor,
  })
);
