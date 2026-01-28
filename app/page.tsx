// 'use client';

// type Post = {
//   id: number;
//   title: string;
//   content: string;
//   liked: boolean;
//   likes: number;
//   comments: string[];
// };
// import { useState } from 'react';
// import {
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Stack,
//   TextField,
//   AppBar,
//   Toolbar,
//   IconButton,
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   Box,
//   Avatar,
//   Divider,
//   CardActions
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// function PostCard({
//   post,
//   onLike,
//   onAddComment
// }: {
//   post: any;
//   onLike: (id: number) => void;
//   onAddComment: (id: number, comment: string) => void;
// }) {
//   const [showComments, setShowComments] = useState(false);
//   const [commentInput, setCommentInput] = useState('');

//   return (
//     <Card sx={{ mb: 2 }}>
//       <CardContent>
//         <Typography variant="h6">{post.title}</Typography>
//         <Typography variant="body2" sx={{ mb: 1 }}>
//           {post.content}
//         </Typography>

//         <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
//           <Button size="small" onClick={() => onLike(post.id)}>
//             {post.liked ? 'Liked' : 'Like'} ({post.likes})
//           </Button>

//           <Button size="small" onClick={() => setShowComments(!showComments)}>
//             Comment
//           </Button>

//           <Button size="small"  onClick={() => alert('Post Shared!')}>Share</Button>
//         </Stack>

//         {showComments && (
//           <>
//             <TextField
//               size="small"
//               fullWidth
//               placeholder="Write a comment..."
//               value={commentInput}
//               onChange={(e) => setCommentInput(e.target.value)}
//               sx={{ mb: 1 }}
//             />

//             <Button
//               size="small"
//               onClick={() => {
//                 onAddComment(post.id, commentInput);
//                 setCommentInput('');
//               }}
//             >
//               Post Comment
//             </Button>

//             <Stack spacing={1} sx={{ mt: 1 }}>
//               {post.comments.map((c: string, i: number) => (
//                 <Typography key={i} variant="body2">
//                   • {c}
//                 </Typography>
//               ))}
//             </Stack>
//           </>
//         )}
//       </CardContent>
//     </Card>
//   );
// }

// // Suggestion component
// function SuggestionCard({ name, onRemove }: { name: string; onRemove: () => void }) {
//   const [status, setStatus] = useState<'connect' | 'pending' | 'connected'>('connect');

//   const handleClick = () => {
//     if (status === 'connect') setStatus('pending');
//     else if (status === 'pending') setStatus('connected');
//     else {
//       setStatus('connect');
//       onRemove(); // optional: remove from list after connected
//     }
//   };

//   return (
//     <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
//       <Typography variant="body2">{name}</Typography>
//       <Button
//         size="small"
//         variant={status === 'connect' ? 'outlined' : 'contained'}
//         color={status === 'connect' ? 'primary' : status === 'pending' ? 'warning' : 'success'}
//         onClick={handleClick}
//       >
//         {status === 'connect'
//           ? 'Connect'
//           : status === 'pending'
//             ? 'Pending'
//             : 'Connected'}
//       </Button>
//     </Stack>
//   );
// }

// // Right sidebar containing multiple suggestions
// function SuggestionsColumn() {
//   const [suggestions, setSuggestions] = useState(['Alice', 'Bob', 'Charlie']);

//   const removeSuggestion = (name: string) => {
//     setSuggestions((prev) => prev.filter((s) => s !== name));
//   };

//   return (
//     <Card sx={{ mb: 2, p: 1 }}>
//       <CardContent>
//         <Typography variant="h6">Suggestions</Typography>
//         {suggestions.map((name) => (
//           <SuggestionCard
//             key={name}
//             name={name}
//             onRemove={() => removeSuggestion(name)}
//           />
//         ))}
//       </CardContent>
//     </Card>
//   );
// }

// // Profile component
// function ProfileCard() {
//   const [name, setName] = useState('Jigisha Ponda');
//   const [editing, setEditing] = useState(false);
//   const [tempName, setTempName] = useState(name);
//   const [headline, setHeadline] = useState('Frontend Developer');
//   const [tempHeadline, setTempHeadline] = useState(headline);

//   const saveProfile = () => {
//     setName(tempName);
//     setHeadline(tempHeadline);
//     setEditing(false);
//   };

//   return (
//     <Card sx={{ mb: 2, borderRadius: 2, overflow: 'hidden' }}>
//       {/* Profile Header */}
//       <Box sx={{ bgcolor: '#1976d2', height: 80 }} /> {/* Blue header background */}

//       {/* Avatar */}
//       <Box sx={{ display: 'flex', justifyContent: 'center', mt: -4 }}>
//         <Avatar sx={{ width: 80, height: 80 }} src="" />
//       </Box>

//       <CardContent sx={{ textAlign: 'center', pt: 1 }}>
//         {editing ? (
//           <>
//             <TextField
//               size="small"
//               fullWidth
//               value={tempName}
//               onChange={(e) => setTempName(e.target.value)}
//               sx={{ mb: 1 }}
//             />
//             <TextField
//               size="small"
//               fullWidth
//               value={tempHeadline}
//               onChange={(e) => setTempHeadline(e.target.value)}
//               sx={{ mb: 1 }}
//               placeholder="Headline"
//             />
//             <Button variant="contained" size="small" onClick={saveProfile} fullWidth>
//               Save
//             </Button>
//           </>
//         ) : (
//           <>
//             <Typography variant="h6">{name}</Typography>
//             <Typography variant="body2" color="text.secondary">{headline}</Typography>
//             <Button size="small" sx={{ mt: 1 }} onClick={() => setEditing(true)}>Edit Profile</Button>
//           </>
//         )}
//       </CardContent>

//       <Divider />

//       {/* Connections */}
//       <CardContent sx={{ textAlign: 'center', pt: 1, pb: 1 }}>
//         <Typography variant="body2" color="text.secondary">
//           150 Connections
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Grow your network
//         </Typography>
//       </CardContent>

//       <Divider />

//       {/* Quick Links */}
//       <CardActions sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left', px: 2 }}>
//         <Button size="small" fullWidth>My Profile</Button>
//         <Button size="small" fullWidth>My Network</Button>
//         <Button size="small" fullWidth>Posts & Activity</Button>
//       </CardActions>
//     </Card>
//   );
// }


// // Main HomePage
// export default function HomePage() {
//   const [posts, setPosts] =  useState<Post[]>([
//     {
//       id: 1,
//       title: 'Exciting Project!',
//       content: 'Just completed a new project using Next.js and MUI.',
//       liked: false,
//       likes: 0,
//       comments: []
//     },
//     {
//       id: 2,
//       title: 'Career Update',
//       content: 'Looking forward to collaborating on amazing projects.',
//       liked: false,
//       likes: 0,
//       comments: []
//     }
//   ]);
//   const [newPostContent, setNewPostContent] = useState('');
//   const handleLike = (id: number) => {
//     setPosts(prev =>
//       prev.map(post =>
//         post.id === id
//           ? {
//             ...post,
//             liked: !post.liked,
//             likes: post.liked ? post.likes - 1 : post.likes + 1
//           }
//           : post
//       )
//     );
//   };

//   const handleAddComment = (id: number, comment: string) => {
//     setPosts(prev =>
//       prev.map(post =>
//         post.id === id
//           ? { ...post, comments: [...post.comments, comment] }
//           : post
//       )
//     );
//   };

//   const addNewPost = () => {
//     if (!newPostContent.trim()) return;

//     const newPost = {
//       id: Date.now(),          // unique id
//       title: 'New Post',
//       content: newPostContent,
//       liked: false,
//       likes: 0,
//       comments: []
//     };

//     setPosts(prev => [newPost, ...prev]);
//     setNewPostContent('');
//   };

//   return (
//     <Container maxWidth="lg" sx={{ mt: 2 }}>
//       <Grid container spacing={2}>
//         {/* Profile */}
//         <Grid item xs={12} md={3} display={{ xs: 'none', sm: 'block' }}>
//           <ProfileCard />
//         </Grid>

//         {/* Feed */}
//         <Grid item xs={12} md={6}>
//           {/* New Post Input */}
//           <Card sx={{ mb: 2 }}>
//             <CardContent>
//               <TextField
//                 label="Start a post"
//                 placeholder="What's on your mind?"
//                 multiline
//                 fullWidth
//                 minRows={2}
//                 value={newPostContent}
//                 onChange={(e) => setNewPostContent(e.target.value)}
//                 sx={{ mb: 1 }}
//               />
//               <Button
//                 variant="contained"
//                 fullWidth
//                 onClick={addNewPost}
//                 disabled={!newPostContent.trim()}
//               >
//                 Post
//               </Button>
//             </CardContent>
//           </Card>

//           {/* Dynamic Posts */}
//           {posts.map(post => (
//             <PostCard
//               key={post.id}
//               post={post}
//               onLike={handleLike}
//               onAddComment={handleAddComment}
//             />
//           ))}

//         </Grid>

//         {/* Suggestions */}
//         <Grid item xs={12} md={3} display={{ xs: 'none', sm: 'block' }}>
//           <SuggestionsColumn />
//         </Grid>
//       </Grid>
//     </Container>
//   );
// }

'use client';

import { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  TextField,
  Box,
  Avatar,
  Divider,
  CardActions,
  IconButton
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';

type Post = {
  id: number;
  title: string;
  content: string;
  liked: boolean;
  likes: number;
  comments: string[];
};

function PostCard({
  post,
  onLike,
  onAddComment
}: {
  post: Post;
  onLike: (id: number) => void;
  onAddComment: (id: number, comment: string) => void;
}) {
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState('');

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        {/* Post Header */}
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <Avatar sx={{ width: 40, height: 40 }} /> {/* Post author avatar */}
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Jigisha Ponda
            </Typography>
            <Typography variant="caption" color="text.secondary">
              2h • Public
            </Typography>
          </Box>
        </Stack>

        {/* Post content */}
        <Typography variant="body2" sx={{ mb: 1 }}>
          {post.content}
        </Typography>

        {/* Post Actions */}
        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          <Button
            size="small"
            onClick={() => onLike(post.id)}
          >
            {post.liked ? 'Liked' : 'Like'} ({post.likes})
          </Button>

          <Button
            size="small"
            onClick={() => setShowComments(!showComments)}
          >
            Comment
          </Button>

          <Button
            size="small"
            onClick={() => alert('Post Shared!')}
          >
            Share
          </Button>
        </Stack>

        {/* Comments Section */}
        {showComments && (
          <>
            {/* Add Comment */}
            <Stack direction="row" spacing={1} alignItems="flex-center" sx={{ mb: 1 }}>
              <TextField
                size="small"
                placeholder="Add a comment..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                sx={{ flexGrow: 1 }}
              />
              <Button
                size="small"
                variant="text"
                onClick={() => {
                  if (!commentInput.trim()) return;
                  onAddComment(post.id, commentInput);
                  setCommentInput('');
                }}
              >
                Post
              </Button>
            </Stack>

            {/* Display Comments */}
            <Stack spacing={1} sx={{ mt: 1 }}>
              {post.comments.map((c: string, i: number) => (
                <Stack key={i} direction="row" spacing={1} alignItems="flex-start">
                  <Avatar sx={{ width: 30, height: 30 }} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Stack spacing={0.3}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        John Doe
                      </Typography>
                      <Typography variant="body2">{c}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                      <Button size="small" variant="text">Like</Button>
                      <Button size="small" variant="text">Reply</Button>
                      <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                        1h
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </>
        )}

      </CardContent>
    </Card>
  );
}


// Profile Card
function ProfileCard() {
  const [name, setName] = useState('Jigisha Ponda');
  const [headline, setHeadline] = useState('Frontend Developer');
  const [editing, setEditing] = useState(false);
  const [tempName, setTempName] = useState(name);
  const [tempHeadline, setTempHeadline] = useState(headline);

  const saveProfile = () => {
    setName(tempName);
    setHeadline(tempHeadline);
    setEditing(false);
  };

  return (
    <Card sx={{ mb: 2, borderRadius: 2 }}>
      <Box sx={{ bgcolor: '#1976d2', height: 80 }} />
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: -4 }}>
        <Avatar sx={{ width: 80, height: 80 }} />
      </Box>

      <CardContent sx={{ textAlign: 'center', pt: 1 }}>
        {editing ? (
          <>
            <TextField
              size="small"
              fullWidth
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              sx={{ mb: 1 }}
            />
            <TextField
              size="small"
              fullWidth
              value={tempHeadline}
              onChange={(e) => setTempHeadline(e.target.value)}
              sx={{ mb: 1 }}
              placeholder="Headline"
            />
            <Button variant="contained" size="small" fullWidth onClick={saveProfile}>
              Save
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h6">{name}</Typography>
            <Typography variant="body2" color="text.secondary">{headline}</Typography>
            <Button size="small" sx={{ mt: 1 }} onClick={() => setEditing(true)}>
              Edit Profile
            </Button>
          </>
        )}
      </CardContent>

      <Divider />

      <CardContent sx={{ textAlign: 'center', pt: 1, pb: 1 }}>
        <Typography variant="body2" color="text.secondary">
          150 Connections
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Grow your network
        </Typography>
      </CardContent>

      <Divider />

      <CardActions sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left', px: 2 }}>
        <Button size="small" fullWidth>My Profile</Button>
        <Button size="small" fullWidth>My Network</Button>
        <Button size="small" fullWidth>Posts & Activity</Button>
      </CardActions>
    </Card>
  );
}


function SuggestionCard({ name, onRemove }: { name: string; onRemove: () => void }) {
  const [status, setStatus] = useState<'connect' | 'pending' | 'connected'>('connect');

  const handleClick = () => {
    if (status === 'connect') {
      setStatus('pending'); // first click → Pending
    } else if (status === 'pending') {
      setStatus('connected'); // second click → Connected
      // Optional: remove after a short delay
      // setTimeout(onRemove, 2000);
    } else {
      setStatus('connect'); // reset back to connect if clicked again
    }
  };

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 0.5 }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Avatar sx={{ width: 32, height: 32 }}>{name[0]}</Avatar>
        <Typography variant="body2">{name}</Typography>
      </Stack>
      <Button
        size="small"
        variant={status === 'connect' ? 'outlined' : 'contained'}
        color={status === 'connect' ? 'primary' : status === 'pending' ? 'warning' : 'success'}
        onClick={handleClick}
      >
        {status === 'connect' ? 'Connect' : status === 'pending' ? 'Pending' : 'Connected'}
      </Button>
    </Stack>
  );
}

function SuggestionsColumn() {
  const [suggestions, setSuggestions] = useState(['Alen', 'John', 'Jill']);

  const removeSuggestion = (name: string) => {
    setSuggestions(prev => prev.filter(s => s !== name));
  };

  return (
    <Card sx={{ mb: 2, p: 1 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 1 }}>People You May Know</Typography>
        <Stack spacing={1}>
          {suggestions.map(name => (
            <SuggestionCard
              key={name}
              name={name}
              onRemove={() => removeSuggestion(name)}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

// Main Page
export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, title: 'Exciting Project!', content: 'Just completed a new project using Next.js and MUI.', liked: false, likes: 0, comments: [] },
    { id: 2, title: 'Career Update', content: 'Looking forward to collaborating on amazing projects.', liked: false, likes: 0, comments: [] }
  ]);
  const [newPostContent, setNewPostContent] = useState('');

  const handleLike = (id: number) => {
    setPosts(prev => prev.map(post => post.id === id ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } : post));
  };

  const handleAddComment = (id: number, comment: string) => {
    setPosts(prev => prev.map(post => post.id === id ? { ...post, comments: [...post.comments, comment] } : post));
  };

  const addNewPost = () => {
    if (!newPostContent.trim()) return;
    setPosts(prev => [
      { id: Date.now(), title: 'New Post', content: newPostContent, liked: false, likes: 0, comments: [] },
      ...prev
    ]);
    setNewPostContent('');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3} display={{ xs: 'none', sm: 'block' }}>
          <ProfileCard />
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <TextField
                label="Start a post"
                placeholder="What's on your mind?"
                multiline
                fullWidth
                minRows={2}
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                sx={{ mb: 1 }}
              />
              <Button variant="contained" fullWidth onClick={addNewPost} disabled={!newPostContent.trim()}>
                Post
              </Button>
            </CardContent>
          </Card>

          {posts.map(post => (
            <PostCard key={post.id} post={post} onLike={handleLike} onAddComment={handleAddComment} />
          ))}
        </Grid>

        <Grid item xs={12} md={3} display={{ xs: 'none', sm: 'block' }}>
          <SuggestionsColumn />
        </Grid>
      </Grid>
    </Container>
  );
}
