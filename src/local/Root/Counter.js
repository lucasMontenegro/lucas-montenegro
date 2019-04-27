import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';

export default function Counter () {
  const [count, setCount] = useState(0);
  setTimeout(() => setCount(count + 1), 1000);
  return (
    <Typography variant="body1">
      Seconds since you loaded the website: {count}
    </Typography>
  );
}
