import { Box } from '@mui/material';

import { UserImageProp } from '../types/props';

export const UserImage = ({ image, size = '60px' }: UserImageProp) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: 'cover', borderRadius: '50%' }}
        width={size}
        height={size}
        alt="user"
        src={`http://localhost:8080/assets/${image}`}
      />
    </Box>
  );
};
