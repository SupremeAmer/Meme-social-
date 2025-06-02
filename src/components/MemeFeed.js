import React, { useEffect, useState } from 'react';
import { databases } from '../appwrite/config';
import MemeCard from './MemeCard';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';

const DATABASE_ID = process.env.REACT_APP_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.REACT_APP_APPWRITE_MEMES_COLLECTION_ID;

export default function MemeFeed({ user }) {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMemes = async () => {
    setLoading(true);
    try {
      const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
        'orderDesc(created_at)', 'limit(20)'
      ]);
      setMemes(res.documents);
    } catch {
      setMemes([]);
    }
    setLoading(false);
  };

  useEffect(() => { fetchMemes(); }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', fontWeight: 700 }}>
        Latest Memes
      </Typography>
      {loading ? (
        <Typography>Loading memes…</Typography>
      ) : (
        <motion.div layout>
          {memes.map(meme => (
            <MemeCard key={meme.$id} meme={meme} user={user} refreshFeed={fetchMemes} />
          ))}
        </motion.div>
      )}
      {/* Ad slot */}
      <div className="ad-slot" style={{ margin: '2rem 0', textAlign: 'center' }}>
        {/* Place AdSense or AdGram ad code here */}
      </div>
    </Container>
  );
}
