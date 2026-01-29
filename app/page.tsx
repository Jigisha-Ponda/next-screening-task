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
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SearchIcon from '@mui/icons-material/Search';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

type Comment = {
  id: number;
  text: string;
  liked: boolean;
  authorName?: string;
  timeAgo?: string;
};

type Post = {
  id: number;
  author: {
    name: string;
    headline: string;
    avatar?: string;
  };
  content: string;
  image?: string;
  createdAt: string;
  visibility: 'Public' | 'Connections';
  liked: boolean;
  likes: number;
  comments: Comment[];
};

function Header() {
  const [active, setActive] = useState('home');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const NavItem = ({
    icon,
    label,
    value
  }: {
    icon: React.ReactNode;
    label: string;
    value: string;
  }) => (
    <Stack
      spacing={0.3}
      alignItems="center"
      sx={{
        cursor: 'pointer',
        color: active === value ? 'primary.main' : 'text.secondary'
      }}
      onClick={() => setActive(value)}
    >
      {icon}
      {!isMobile && (
        <Typography variant="caption">{label}</Typography>
      )}
    </Stack>
  );

  return (
    <AppBar position="fixed" color="default" elevation={1} sx={{
      bgcolor: '#fff',
      color: 'text.primary',
      borderBottom: '1px solid #e0e0e0'
    }}>
      <Toolbar sx={{ width: '100%', maxWidth: 1200, mx: 'auto', px: 2 }}>
        {/* Logo */}
        <Typography variant="h6" sx={{ mr: 2, cursor: 'pointer' }}>

          <LinkedInIcon
            sx={{
              color: '#0A66C2',
              fontSize: 32,
              cursor: 'pointer'
            }}
          />
        </Typography>

        {/* Search */}
        {!isMobile ? (
          <TextField
            size="small"
            placeholder="Search"
            sx={{
              width: 280,
              bgcolor: '#fff',
              borderRadius: 50,
              '& .MuiOutlinedInput-root': {
                borderRadius: 50,
                paddingLeft: 1
              }
            }}
          />
        ) : (
          <IconButton>
            <SearchIcon />
          </IconButton>
        )}


        <Box sx={{ flexGrow: 1 }} />

        {/* Navigation */}
        <Stack direction="row" spacing={3} alignItems="center">
          <NavItem icon={<HomeIcon />} label="Home" value="home" />
          <NavItem icon={<PeopleIcon />} label="My Network" value="network" />
          <NavItem icon={<WorkIcon />} label="Jobs" value="jobs" />
          <NavItem icon={<ChatIcon />} label="Messaging" value="messages" />

          <NavItem
            icon={
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            }
            label="Notifications"
            value="notifications"
          />

          {/* Profile */}
          <Stack
            spacing={0.3}
            alignItems="center"
            sx={{ cursor: 'pointer' }}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <Avatar sx={{ width: 28, height: 28 }} />
            <Typography variant="caption">Me</Typography>
          </Stack>
        </Stack>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem>View Profile</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

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
          <Avatar src={post.author.avatar} />
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {post.author.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {post.author.headline}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
              {post.createdAt} • {post.visibility}
            </Typography>
          </Box>
        </Stack>

        {post.image && (
          <Box sx={{ mt: 1 }}>
            <img
              src={post.image}
              alt="post"
              style={{
                width: '100%',
                borderRadius: 8,
                maxHeight: 400,
                objectFit: 'cover',
                marginBottom: 8
              }}
            />
          </Box>
        )}



        {/* Post content */}
        <Typography variant="body2" sx={{ mb: 1 }}>
          {post.content}
        </Typography>


        <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
          <Typography variant="caption" color="text.secondary">
            👍 {post.likes}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{
            cursor: 'pointer'
          }} onClick={() => setShowComments(!showComments)}>
            {post.comments.length} comments
          </Typography>
        </Stack>
        <Divider sx={{ my: 1 }} />

        {/* Post Actions */}
        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          sx={{ mt: 1 }}
        >
          <Button
            size="small"
            startIcon={post.liked ? <ThumbUpAltIcon /> : <ThumbUpAltOutlinedIcon />}
            color={post.liked ? 'primary' : 'inherit'}
            onClick={() => onLike(post.id)}
          >
            Like
          </Button>

          <Button
            size="small"
            startIcon={<ChatBubbleOutlineIcon />}
            onClick={() => setShowComments(!showComments)}
          >
            Comment
          </Button>

          <Button
            size="small"
            startIcon={<ShareOutlinedIcon />}
            onClick={() => alert('Post Shared')}
          >
            Share
          </Button>
        </Stack>
        {/* Comments Section */}

        {showComments && (
          <Stack spacing={1} sx={{ mt: 1 }}>
            {/* Add Comment */}
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
              <TextField
                size="small"
                placeholder="Add a comment..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                sx={{
                  flexGrow: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 20,
                    paddingLeft: 1
                  }
                }}
              />
              <Button
                size="small"
                variant="text"
                disabled={!commentInput.trim()}
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
            {post.comments.map((c: any, i: number) => (
              <Stack
                key={i}
                direction="row"
                spacing={1}
                alignItems="flex-start"
                sx={{
                  bgcolor: '#fff',
                  p: 1,
                  borderRadius: 2
                }}
              >
                <Avatar sx={{ width: 32, height: 32 }}>{c.authorInitials || 'JD'}</Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Stack spacing={0.3}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {c.authorName || 'John Doe'}
                    </Typography>
                    <Typography variant="body2">{c.text || c}</Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1.5}
                    alignItems="center"
                    sx={{ mt: 0.5, fontSize: '0.75rem', color: 'text.secondary' }}
                  >
                    <Button
                      size="small"
                      variant="text"
                      color={c.liked ? 'primary' : 'inherit'}
                      onClick={() => {
                        const updatedComments = post.comments.map((comment, index) =>
                          index === i
                            ? { ...comment, liked: !comment.liked }
                            : comment
                        );

                        onAddComment(post.id, '');
                      }}
                    >
                      {c.liked ? 'Liked' : 'Like'}
                    </Button>
                    <Button size="small" variant="text">Reply</Button>
                    <Typography sx={{ ml: 'auto' }}>{c.timeAgo || '1h'}</Typography>
                  </Stack>
                </Box>
              </Stack>
            ))}
          </Stack>
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
      <Box sx={{ display: 'flex', justifyContent: 'left', mt: -4, px: 2 }}>
        <Avatar sx={{ width: 80, height: 80 }} />
      </Box>

      <CardContent sx={{ textAlign: 'left', pt: 1 }}>
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

      <CardContent sx={{ textAlign: 'left', pt: 1, pb: 1 }}>
        <Typography variant="body2" color="text.secondary">
          150 Connections
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Grow your network
        </Typography>
      </CardContent>

      <Divider />

      {/* <CardActions sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left', px: 2 }}>
        <Button size="small" fullWidth>My Profile</Button>
        <Button size="small" fullWidth>My Network</Button>
        <Button size="small" fullWidth>Posts & Activity</Button>
      </CardActions> */}
    </Card>
  );
}

function SavedItems() {
  const items = [
    {
      label: 'Saved items',
      icon: <BookmarkBorderIcon fontSize="small" />,
    },
    {
      label: 'Groups',
      icon: <GroupOutlinedIcon fontSize="small" />,
    },
    {
      label: 'Events',
      icon: <EventOutlinedIcon fontSize="small" />,
    },
    {
      label: 'Newsletter',
      icon: <MailOutlineIcon fontSize="small" />,
    }
  ];

  const handleClick = (label: any) => {
    console.log(`${label} clicked`);
    // later: router.push(`/saved`) etc.
  };

  return (
    <Card sx={{ borderRadius: 2 }}>
      <CardContent sx={{ p: 0 }}>
        <Stack>
          {items.map((item) => (
            <Box
              key={item?.label}
              onClick={() => handleClick(item?.label)}
              sx={{
                px: 2,
                py: 1.2,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              {item?.icon}

              <Typography variant="body2" fontWeight={500}>
                {item?.label}
              </Typography>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}


function SuggestionsColumn() {
  const [suggestions, setSuggestions] = useState([
    { name: 'Alen', role: 'Frontend Developer', mutual: 12, connected: false },
    { name: 'John', role: 'Product Designer', mutual: 8, connected: false },
    { name: 'Jill', role: 'HR Manager', mutual: 5, connected: false },
  ]);

  const handleConnect = (name: any) => {
    setSuggestions(prev =>
      prev.map(user =>
        user.name === name ? { ...user, connected: true } : user
      )
    );
  };

  const removeSuggestion = (name: string) => {
    setSuggestions(prev => prev.filter(s => s.name !== name));
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent sx={{ pb: 1 }}>
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
          People you may know
        </Typography>

        <Stack spacing={1}>
          {suggestions.map((user) => (
            <Stack
              key={user.name}
              direction="row"
              spacing={1.5}
              alignItems="flex-start"
              sx={{
                p: 1,
                borderRadius: 1,
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              {/* Avatar */}
              <Avatar sx={{ width: 44, height: 44 }}>
                {user.name[0]}
              </Avatar>

              {/* Info */}
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body2" fontWeight={600}>
                  {user.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {user.role}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  {user.mutual} mutual connections
                </Typography>

                {/* Connect Button */}
                <Button
                  size="small"
                  variant="outlined"
                  sx={{
                    mt: 0.5,
                    borderRadius: 20,
                    textTransform: 'none',
                  }}

                  onClick={() => handleConnect(user.name)}
                >
                  {user.connected ? 'Pending' : 'Connect'}
                </Button>
              </Box>

              {/* Remove */}
              <IconButton size="small" onClick={() => removeSuggestion(user.name)}>
                ✕
              </IconButton>
            </Stack>
          ))}
        </Stack>

        <Typography
          variant="caption"
          color="primary"
          sx={{ mt: 1, display: 'inline-block', cursor: 'pointer' }}
        >
          Show more
        </Typography>
      </CardContent>
    </Card>
  );
}


function LinkedInNews() {
  const news = [
    { title: 'IT hiring sees steady growth', time: '2h ago', readers: '12,345 readers' },
    { title: 'Remote work trends in 2026', time: '4h ago', readers: '9,876 readers' },
    { title: 'React & AI skills in demand', time: '6h ago', readers: '15,210 readers' },
    { title: 'Startups raise record funding', time: '1d ago', readers: '21,004 readers' },
  ];

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent sx={{ pb: 1 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          LinkedIn News
        </Typography>

        <Stack spacing={1} sx={{ mt: 1 }}>
          {news.map((item, i) => (
            <Stack
              key={i}
              spacing={0.3}
              sx={{
                cursor: 'pointer',
                '&:hover': { bgcolor: 'action.hover' },
                p: 0.5,
                borderRadius: 1,
              }}
            >
              <Typography variant="body2" fontWeight={600}>
                {item.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {item.time} · {item.readers}
              </Typography>
            </Stack>
          ))}
        </Stack>

        <Typography
          variant="caption"
          color="primary"
          sx={{ mt: 1, display: 'inline-block', cursor: 'pointer' }}
        >
          Show more
        </Typography>
      </CardContent>
    </Card>
  );
}


// Main Page
export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: {
        name: 'Jigisha Ponda',
        headline: 'Frontend Developer | React | Next.js'
      },
      content:
        '🚀 Excited to share that I just completed a LinkedIn-style feed using Next.js and MUI.\n\nWould love to hear your feedback!',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      createdAt: '2h',
      visibility: 'Public',
      liked: false,
      likes: 12,
      comments: [
        { id: 1, text: 'Looks great!', liked: false, authorName: 'John Doe', timeAgo: '1h' },
        { id: 2, text: 'Nice UI 👏', liked: false, authorName: 'Jack', timeAgo: '30m' }
      ]
    },
    {
      id: 2,
      author: {
        name: 'D Ponda',
        headline: 'Senior Software Engineer'
      },
      content:
        '💡 Consistency beats motivation.\n\nShow up every day, even when it’s hard.',
      createdAt: '1d',
      visibility: 'Public',
      liked: true,
      likes: 34,
      comments: [
        { id: 1, text: 'Looks great!', liked: false, authorName: 'John Doe', timeAgo: '1h' },
        { id: 2, text: 'Nice UI 👏', liked: false, authorName: 'Alen', timeAgo: '30m' }
      ]
    },
    {
      id: 3,
      author: {
        name: 'Alen',
        headline: 'Graphic Designer'
      },
      content:
        '💡 Design is not just what it looks like and feels like. Design is how it works.\n\n- Steve Jobs',
      createdAt: '1d',
      visibility: 'Public',
      liked: true,
      likes: 34,
      comments: [
        { id: 1, text: 'Looks great!', liked: false, authorName: 'John Doe', timeAgo: '1h' },
        { id: 2, text: 'Nice UI 👏', liked: false, authorName: 'Jill', timeAgo: '30m' }
      ]
    }
  ]);
  const [newPostContent, setNewPostContent] = useState('');

  const handleLike = (id: number) => {
    setPosts(prev => prev.map(post => post.id === id ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } : post));
  };

  const handleAddComment = (id: number, text: string) => {
    const newComment: Comment = {
      id: Date.now(),
      text,
      liked: false,
      authorName: 'You',
      timeAgo: 'Just now'
    };

    setPosts(prev =>
      prev.map(post =>
        post.id === id
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );
  };

  const addNewPost = () => {
    if (!newPostContent.trim()) return;

    const newPost: Post = {
      id: Date.now(),
      author: {
        name: 'Jigisha Ponda',
        headline: 'Frontend Developer'
      },
      content: newPostContent,
      createdAt: 'Just now',
      visibility: 'Public',
      liked: false,
      likes: 0,
      comments: []
    };

    setPosts(prev => [newPost, ...prev]);
    setNewPostContent('');
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 2, pt: '64px'}}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={3}>
            <Stack spacing={2}>
              <ProfileCard />
              <SavedItems />
            </Stack>
          </Grid>

          <Grid item xs={12} sm={8} md={9}>
            <Grid container spacing={2}>

              {/* CENTER FEED */}
              <Grid item xs={12} md={8}>
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


              <Grid item xs={12} md={4}>
                <LinkedInNews />
                <SuggestionsColumn />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
