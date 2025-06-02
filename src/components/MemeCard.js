import React, { useEffect, useState } from 'react';
import { storage, databases } from '../appwrite/config';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LikeButton from './LikeButton';
import Comments from './Comments';
import { motion } from 'framer-motion';

const DATABASE_ID = process.env.REACT_APP_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.REACT_APP_APPWRITE_MEMES_COLLECTION_ID;
const BUCKET_ID = process.env.REACT_APP_APPWRITE_BUCKET_ID;

export default function MemeCard({ meme, user, refreshFeed }) {
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    setImgUrl(storage.getFilePreview(BUCKET_ID, meme.meme_file_id));
  }, [meme.meme_file_id]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      style={{ marginBottom: 24 }}
    >
      <Card elevation={6} sx={{ borderRadius: 4 }}>
        <CardMedia
          component="img"
          height="320"
          image={imgUrl}
          alt="meme"
          sx={{ objectFit: 'cover', borderRadius: 2 }}
        />
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, flexGrow: 1 }}>
              {meme.user_name}
            </Typography>
            <LikeButton meme={meme} user={user} refreshFeed={refreshFeed} />
          </Box>
          <Comments meme={meme} user={user} />
        </CardContent>
      </Card>
    </motion.div>
  );
}
