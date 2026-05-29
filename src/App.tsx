import React, { useState, useEffect, useRef } from 'react';
import {
  Camera,
  MapPin,
  Users,
  MessageCircle,
  User as UserIcon,
  Home,
  Flame,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Heart,
  CornerUpRight,
  ArrowLeft,
  Bell,
  Settings,
  ShieldCheck,
  Gift,
  Gem,
  Plus,
  Play,
  RotateCw,
  Sparkles,
  Zap,
  HelpCircle,
  Star,
  Check,
  X,
  FileOutput,
  FileX,
  Search,
  Bookmark,
  Trash2,
  UserPlus,
  Video,
  Lock,
  Globe,
  Users2,
  MoreHorizontal,
  Clock,
  AlertTriangle,
  ArrowRight,
  Hash,
  Copy,
  MessageSquare,
  Pencil,
  Image as ImageIcon,
  Mic,
  Smile,
  ClipboardCheck,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TOPICS, CURRENT_USER, GIFTS, SHOP_ITEMS, SHARE_FRIENDS, MOCK_GIFT_RECORDS } from './constants';
import { Logo } from './components/Logo';
import LoginScreen from './screens/LoginScreen';
import { Screen, Topic, GiftRecord } from './types';

// --- Shared Components ---

const SpotlightMarquee = ({ spotlightTopics, onSelect }: { spotlightTopics: Topic[], onSelect: (t: Topic) => void }) => {
  if (spotlightTopics.length === 0) return null;

  return (
    <div className="w-full h-12 flex items-center overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-dark to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-dark to-transparent z-10"></div>
      <motion.div
        animate={{ x: [0, -900] }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap gap-3 items-center px-4"
      >
        {[...spotlightTopics, ...spotlightTopics, ...spotlightTopics, ...spotlightTopics, ...spotlightTopics].map((topic, i) => (
          <button
            key={`${topic.id}-${i}`}
            onClick={() => onSelect(topic)}
            className="h-9 px-4 rounded-full bg-white/10 border border-white/15 backdrop-blur-xl flex items-center gap-2.5 group shadow-sm"
          >
            {i % 2 === 0 ? (
              <Flame size={14} className="text-red-primary fill-current" />
            ) : (
              <Sparkles size={14} className="text-gold fill-gold" />
            )}
            <span className="text-sm font-bold text-white/80 max-w-[150px] truncate">{topic.city}的{topic.prompt}</span>
          </button>
        ))}
      </motion.div>
    </div>
  );
};

const lightPageRoot = 'flex flex-col h-full bg-[radial-gradient(circle_at_top,#fffaf4_0%,#f7f2ea_42%,#f2ebe1_100%)] text-[#2f261d]';
const lightPageRootPadded = `${lightPageRoot} pt-8`;
const lightHeaderShell = 'p-6 flex items-center justify-between sticky top-0 bg-[#f9f5ef]/90 backdrop-blur-xl z-20 border-b border-[#e8dfd2]';
const lightIconButton = 'w-10 h-10 rounded-xl flex items-center justify-center border border-[#e9dfd3] bg-white/80 text-[#4f3d2d] shadow-sm active:scale-95 transition-transform';
const lightSurfaceCard = 'rounded-[24px] border border-[#ece3d7] bg-white/82 shadow-[0_18px_40px_rgba(103,81,58,0.06)] backdrop-blur-xl';
const lightInputField = 'bg-white/82 border border-[#eadfce] text-[#2f261d] placeholder:text-[#baa897]';
const userIpLocations: Record<string, string> = {
  [CURRENT_USER.name]: CURRENT_USER.ipLocation || '广东',
  Mia: '浙江',
  林野: '上海',
  周屿: '广东',
  南川: '四川',
  Echo: '北京',
  阿泽: '广东',
  小北: '江苏',
};
const getUserIpLocation = (name: string) => userIpLocations[name] || ['广东', '浙江', '上海', '北京', '四川', '江苏'][Math.abs([...name].reduce((sum, char) => sum + char.charCodeAt(0), 0)) % 6];
const dailyLifeFrames = [
  'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1494526585095-c41746248156?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop',
];
const dailyLifeVideos = [
  'https://videos.pexels.com/video-files/853889/853889-hd_1920_1080_25fps.mp4',
  'https://videos.pexels.com/video-files/2795749/2795749-uhd_2560_1440_25fps.mp4',
  'https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4',
  'https://videos.pexels.com/video-files/855564/855564-hd_1920_1080_24fps.mp4',
  'https://videos.pexels.com/video-files/1721294/1721294-hd_1920_1080_25fps.mp4',
  'https://videos.pexels.com/video-files/2103099/2103099-hd_1920_1080_30fps.mp4',
  'https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4',
  'https://videos.pexels.com/video-files/3255275/3255275-hd_1920_1080_25fps.mp4',
  'https://videos.pexels.com/video-files/3769033/3769033-hd_1920_1080_25fps.mp4',
  'https://videos.pexels.com/video-files/4496268/4496268-hd_1920_1080_25fps.mp4',
  'https://videos.pexels.com/video-files/3752507/3752507-hd_1920_1080_24fps.mp4',
  'https://videos.pexels.com/video-files/4782135/4782135-hd_1920_1080_25fps.mp4',
];
const dailyLifeCaptions = [
  '今天的第一口早餐',
  '下班路上的风',
  '雨后路面倒影',
  '地铁窗外一秒',
  '厨房里的热气',
  '深夜还亮的灯',
  '午后三点影子',
  '便利店门口',
  '桌面没来得及收',
  '回家前的天空',
  '和朋友碰个头',
  '新鞋第一次出门',
];
const dailyLifeUsers = ['林野', 'Mia', '周屿', '南川', 'Echo', '阿泽', '小北', '苏苏', '张震', 'Dear', 'Ann', 'Lucas'];
type HomeFeedItemKind = 'collab' | 'cp' | 'video' | 'image';
type HomeFeedItem = {
  id: string;
  topic: Topic;
  mediaIndex: number;
  title: string;
  author: string;
  kind: HomeFeedItemKind;
  heightClass: string;
};
const suggestedCreators = [
  { name: '阿飞 Kathy', bio: '教育内容热门作者', followers: '12.8万粉丝', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop' },
  { name: '克里斯 Kris', bio: '热门作者', followers: '5684粉丝', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=128&h=128&fit=crop' },
  { name: '把故事听到最后 Jayhon', bio: '音乐内容热门作者', followers: '8.7万粉丝', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=128&h=128&fit=crop' },
  { name: '-谢安然-', bio: '二次元内容热门作者', followers: '6.2万粉丝', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=128&h=128&fit=crop', verified: true },
  { name: '在香港的阿龍', bio: '探店内容热门作者', followers: '4.9万粉丝', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop' },
  { name: '一堆林女士', bio: '情感内容热门作者', followers: '3.8万粉丝', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=128&h=128&fit=crop' },
  { name: '冰镇西瓜', bio: '模特', followers: '2.6万粉丝', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=watermelon' },
  { name: '大连攻略', bio: '美食内容热门作者', followers: '9.4万粉丝', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=大连攻略&backgroundColor=ef4444&fontWeight=700' },
];

const BottomNav = ({ active, setScreen, onPlusClick }: {
  active: Screen,
  setScreen: (s: Screen) => void,
  onPlusClick: () => void,
}) => {
  const navItems: { id: Screen, label: string, icon: typeof UserIcon }[] = [
    { id: 'home', label: '首页', icon: Home },
    { id: 'circle', label: 'DR圈', icon: Users },
  ];

  const rightNavItems: { id: Screen, label: string, icon: typeof UserIcon }[] = [
    { id: 'messages', label: '消息', icon: MessageCircle },
    { id: 'me', label: '我的', icon: UserIcon },
  ];
  const isLightNav = true;

  const getNavButtonClass = (id: Screen) =>
    `flex flex-col items-center justify-center space-y-1 w-12 h-12 rounded-xl transition-all duration-300 ${
      active === id
        ? isLightNav
          ? 'text-[#2f261d]'
          : 'text-white'
        : isLightNav
          ? 'text-[#ab9a89] hover:text-[#7a5c43]'
          : 'text-white/30 hover:text-gold/60'
    }`;

  const getNavLabelClass = (id: Screen) =>
    `text-[10px] font-black tracking-widest ${
      active === id
        ? isLightNav
          ? 'text-[#2f261d]'
          : 'text-white'
        : isLightNav
          ? 'text-[#ab9a89]'
          : 'text-white/30'
    }`;

  const indicatorClass = isLightNav
    ? 'absolute -bottom-1 w-1 h-1 bg-[#2f261d] rounded-full shadow-[0_0_8px_rgba(47,38,29,0.28)]'
    : 'absolute -bottom-1 w-1 h-1 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]';

  return (
    <nav className={`absolute bottom-0 left-0 right-0 h-[96px] backdrop-blur-xl flex items-center justify-between px-4 z-50 pb-6 ${
      isLightNav
        ? 'bg-[#f7f3ec]/95 border-t border-[#e8dfd2] shadow-[0_-10px_30px_rgba(99,77,56,0.08)]'
        : 'bg-dark/95 border-t border-white/[0.03]'
    }`}>
      <div className="flex flex-1 justify-around">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setScreen(item.id)}
            className={getNavButtonClass(item.id)}
          >
            <item.icon size={20} className={active === item.id ? (isLightNav ? 'text-[#2f261d] fill-[#2f261d]/10' : 'text-white fill-white/10') : ''} strokeWidth={active === item.id ? 2.5 : 2} />
            <span className={getNavLabelClass(item.id)}>
              {item.label}
            </span>
            {active === item.id && (
              <motion.div layoutId="navIndicator" className={indicatorClass} />
            )}
          </button>
        ))}
      </div>

      <button
        onClick={onPlusClick}
        className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm active:scale-90 transition-all z-50 ${
          isLightNav
            ? 'bg-[#FE2C55] text-white shadow-[0_10px_20px_rgba(254,44,85,0.22)]'
            : 'border-dark bg-white text-dark'
        }`}
      >
        <Plus size={28} strokeWidth={3.2} />
      </button>

      <div className="flex flex-1 justify-around">
        {rightNavItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setScreen(item.id)}
            className={getNavButtonClass(item.id)}
          >
            <item.icon size={20} className={active === item.id ? (isLightNav ? 'text-[#2f261d] fill-[#2f261d]/10' : 'text-white fill-white/10') : ''} strokeWidth={active === item.id ? 2.5 : 2} />
            <span className={getNavLabelClass(item.id)}>
              {item.label}
            </span>
            {active === item.id && (
              <motion.div layoutId="navIndicator" className={indicatorClass} />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

// --- Home Screen ---

const HomeScreen = ({
  setScreen,
  setSelectedTopic,
  topics,
  savedTopicIds,
  toggleFavorite,
  likedTopicIds,
  toggleLike,
  setSelectedUserName,
  spotlightTopicIds,
  spotlightTopic,
  showToast,
  showGrowthPrompt,
  dismissGrowthPrompt,
  setCircleInitialTopicId,
  onOpenContent,
}: {
  setScreen: (s: Screen) => void,
  setSelectedTopic: (t: Topic) => void,
  topics: Topic[],
  savedTopicIds: Set<string>,
  toggleFavorite: (id: string) => void,
  likedTopicIds: Set<string>,
  toggleLike: (id: string) => void,
  setSelectedUserName: (name: string) => void,
  spotlightTopicIds: Set<string>,
  spotlightTopic: (id: string) => void,
  showToast: (m: string) => void,
  showGrowthPrompt: boolean,
  dismissGrowthPrompt: () => void,
  setCircleInitialTopicId: (id: string | undefined) => void,
  onOpenContent: (item: HomeFeedItem) => void,
}) => {
  const [homeTab, setHomeTab] = useState<'推荐' | '关注'>('推荐');
  const [hiddenSuggestedCreators, setHiddenSuggestedCreators] = useState<Set<string>>(new Set());
  const [followedSuggestedCreators, setFollowedSuggestedCreators] = useState<Set<string>>(new Set());
  const [activeFeaturedIndex, setActiveFeaturedIndex] = useState(0);
  const feedItems = topics.flatMap((topic, topicIndex) =>
    [0, 1].map((variant) => {
      const mediaIndex = (topicIndex * 2 + variant) % dailyLifeFrames.length;
      return {
        id: `${topic.id}-${variant}`,
        topic,
        mediaIndex,
        title: variant === 0 ? topic.title : dailyLifeCaptions[mediaIndex],
        author: dailyLifeUsers[mediaIndex],
        kind: variant === 0 ? 'collab' : topicIndex % 3 === 0 ? 'cp' : topicIndex % 2 === 0 ? 'video' : 'image',
        heightClass: 'aspect-[4/5]',
      } satisfies HomeFeedItem;
    })
  );
  const followedAuthorNames = followedSuggestedCreators;
  const priorityFeedItems = (['collab', 'cp', 'video', 'image'] as const)
    .map(kind => feedItems.find(item => item.kind === kind))
    .filter((item): item is typeof feedItems[number] => Boolean(item));
  const priorityFeedItemIds = new Set(priorityFeedItems.map(item => item.id));
  const prioritizedFeedItems = [
    ...priorityFeedItems,
    ...feedItems.filter(item => !priorityFeedItemIds.has(item.id)),
  ];
  const visibleFeedItems = homeTab === '关注'
    ? prioritizedFeedItems
    : prioritizedFeedItems;
  const feedColumns = visibleFeedItems.reduce<[typeof visibleFeedItems, typeof visibleFeedItems]>((columns, item, index) => {
    columns[index % 2].push(item);
    return columns;
  }, [[], []]);
  const visibleSuggestedCreators = suggestedCreators.filter(author => !hiddenSuggestedCreators.has(author.name));
  const featuredTopics = topics.filter(t => t.status !== 'completed').slice(0, 5);
  const activeFeaturedTopic = featuredTopics[activeFeaturedIndex % Math.max(featuredTopics.length, 1)] || topics[0];
  const featuredTopic = activeFeaturedTopic;

  useEffect(() => {
    if (homeTab !== '推荐' || featuredTopics.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveFeaturedIndex(prev => (prev + 1) % featuredTopics.length);
    }, 3600);
    return () => window.clearInterval(timer);
  }, [featuredTopics.length, homeTab]);

  const handleHideSuggestedCreator = (name: string) => {
    setHiddenSuggestedCreators(prev => new Set(prev).add(name));
  };
  const handleFollowSuggestedCreator = (name: string) => {
    setFollowedSuggestedCreators(prev => new Set(prev).add(name));
    showToast(`已关注 ${name}`);
  };

  return (
    <div className="flex flex-col h-full bg-[#f7f3ec] font-sans pt-8 relative overflow-hidden text-[#2f261d]">
      <header className="sticky top-0 z-30 flex items-center justify-start bg-[#f7f3ec]/92 px-4 pb-3 pt-4 backdrop-blur-xl">
        <div className="flex items-center gap-5">
          {(['推荐', '关注'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setHomeTab(tab)}
              className={`relative h-10 px-1 text-[16px] font-black transition-colors ${
                homeTab === tab ? 'text-[#2f261d]' : 'text-[#9d8c7a]'
              }`}
            >
              {tab}
              {homeTab === tab && (
                <motion.span
                  layoutId="homeFeedTab"
                  className="absolute bottom-0 left-1/2 h-1 w-5 -translate-x-1/2 rounded-full bg-[#FE2C55]"
                />
              )}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar px-3 pb-32 pt-1">
        {homeTab === '推荐' && (
          <section className="mb-4">
            <div className="relative h-44 overflow-hidden rounded-[20px] bg-black text-white shadow-[0_18px_38px_rgba(47,38,29,0.16)]">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.button
                  key={activeFeaturedTopic.id}
                  initial={{ opacity: 0, x: 46, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -36, scale: 0.98 }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => {
                    setSelectedTopic(activeFeaturedTopic);
                    setScreen('topic-detail');
                  }}
                  className="absolute inset-0 text-left active:scale-[0.99] transition-transform"
                >
                  <motion.img
                    src={activeFeaturedTopic.image || dailyLifeFrames[activeFeaturedIndex % dailyLifeFrames.length]}
                    alt=""
                    className="h-full w-full object-cover opacity-88"
                    initial={{ scale: 1.06 }}
                    animate={{ scale: 1.12 }}
                    transition={{ duration: 3.6, ease: 'linear' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/18 to-black/20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/18 to-transparent" />
                  <span
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedTopic(activeFeaturedTopic);
                      setScreen('join');
                    }}
                    className="absolute right-3 top-3 rounded-full bg-white px-3 py-1.5 text-[10px] font-black text-[#2f261d] shadow-lg active:scale-95 transition-transform"
                  >
                    参与共创
                  </span>
                  <div className="absolute left-4 right-4 bottom-4">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="rounded-full bg-white/16 px-3 py-1 text-[10px] font-black backdrop-blur-md">热门共创</span>
                    </div>
                    <h2 className="text-xl font-black leading-tight">{activeFeaturedTopic.title}</h2>
                    <p className="mt-1 line-clamp-1 text-[12px] font-bold text-white/68">{activeFeaturedTopic.description}</p>
                  </div>
                </motion.button>
              </AnimatePresence>

              <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 items-center justify-center gap-1.5">
                {featuredTopics.map((dotTopic, dotIndex) => (
                  <button
                    key={`featured-dot-${dotTopic.id}`}
                    onClick={() => setActiveFeaturedIndex(dotIndex)}
                    className={`h-1.5 rounded-full transition-all ${dotIndex === activeFeaturedIndex ? 'w-4 bg-[#FE2C55]' : 'w-1.5 bg-white/55'}`}
                    aria-label={`切换到${dotTopic.title}`}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {homeTab === '关注' && (
          <section className="mb-4 text-[#2f261d]">
            <div className="overflow-hidden rounded-[22px] border border-[#eadfce] bg-white shadow-[0_14px_32px_rgba(103,81,58,0.08)]">
              <div className="border-b border-[#f1eee9] px-6 pb-11 pt-11 text-center">
                <h2 className="text-[26px] font-black tracking-tight">还没有关注的人</h2>
                <p className="mt-4 text-[16px] font-bold text-[#a39a91]">关注更多人，在这里查看 TA 的最新动态</p>
              </div>

              <div className="px-4 pb-5 pt-6">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[18px] font-black text-[#4a4540]">你可能感兴趣的人</h3>
                    <Info size={17} className="text-[#a9a29a]" />
                  </div>
                </div>

                <div className="space-y-6">
                  {visibleSuggestedCreators.map(author => {
                    const isFollowed = followedSuggestedCreators.has(author.name);
                    return (
                      <div key={author.name} className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            setSelectedUserName(author.name);
                            setScreen('user-profile');
                          }}
                          className="h-[58px] w-[58px] shrink-0 overflow-hidden rounded-full bg-[#f6ede3]"
                        >
                          <img src={author.avatar} alt="" className="h-full w-full object-cover" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedUserName(author.name);
                            setScreen('user-profile');
                          }}
                          className="min-w-0 flex-1 text-left"
                        >
                          <div className="flex min-w-0 items-center gap-1.5">
                            <p className="truncate text-[16px] font-black leading-tight text-[#3c3834]">{author.name}</p>
                            {author.verified && (
                              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#FE2C55] text-white">
                                <Check size={10} strokeWidth={4} />
                              </span>
                            )}
                          </div>
                        </button>
                        <button
                          onClick={() => handleFollowSuggestedCreator(author.name)}
                          className={`h-10 shrink-0 rounded-full border px-5 text-[15px] font-black active:scale-95 transition-all ${
                            isFollowed
                              ? 'border-[#ded4c7] bg-[#f4eee6] text-[#9b938b]'
                              : 'border-[#FE2C55] bg-white text-[#FE2C55]'
                          }`}
                        >
                          {isFollowed ? '已关注' : '关注'}
                        </button>
                        <button
                          onClick={() => handleHideSuggestedCreator(author.name)}
                          className="flex h-10 w-8 shrink-0 items-center justify-center text-[#9b938b] active:scale-95 transition-transform"
                          aria-label={`不再推荐 ${author.name}`}
                        >
                          <X size={23} strokeWidth={1.8} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {visibleFeedItems.length > 0 && (
          <section className="grid grid-cols-2 gap-3 items-start">
            {feedColumns.map((column, columnIndex) => (
              <div key={`feed-column-${columnIndex}`} className="flex flex-col gap-3">
                {column.map((item) => {
                  const isLiked = likedTopicIds.has(item.topic.id);
                  return (
              <button
                key={item.id}
                onClick={() => {
                  onOpenContent(item);
                }}
                className="group overflow-hidden rounded-[18px] bg-white text-left shadow-[0_10px_26px_rgba(103,81,58,0.08)] border border-[#eadfce] active:scale-[0.98] transition-transform"
              >
	                <div className={`relative ${item.heightClass} flex items-center justify-center overflow-hidden bg-[#eadfce]`}>
                    {item.kind === 'collab' || item.kind === 'cp' ? (
                      <div className="grid h-full w-full grid-cols-2 grid-rows-6 gap-px bg-black">
                        {Array.from({ length: 12 }).map((_, frameIndex) => {
                          const frameSeed = (item.mediaIndex + frameIndex) % dailyLifeFrames.length;
                          return (
                            <div key={frameIndex} className="relative overflow-hidden bg-[#e6ddd2]">
                              <img
                                src={dailyLifeFrames[frameSeed]}
                                alt=""
                                className="h-full w-full object-cover transition-transform duration-500 group-active:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/62 via-black/12 to-black/18" />
                              <div className="absolute inset-x-1.5 top-1/2 -translate-y-1/2">
                                <p className="line-clamp-2 text-center text-[10px] font-black leading-tight text-white drop-shadow-[0_2px_7px_rgba(0,0,0,0.58)]">
                                  {dailyLifeCaptions[frameSeed]}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : item.kind === 'video' ? (
                      <video
                        src={dailyLifeVideos[item.mediaIndex]}
                        poster={dailyLifeFrames[item.mediaIndex]}
                        className="h-full w-full object-cover transition-transform duration-500 group-active:scale-105"
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      />
                    ) : (
                      <img src={dailyLifeFrames[item.mediaIndex]} alt="" className="h-full w-full object-cover transition-transform duration-500 group-active:scale-105" />
                    )}
                    {item.kind === 'collab' && (
                      <span className="absolute right-2 top-2 rounded-full bg-black/58 px-2.5 py-1 text-[10px] font-black text-white shadow-sm backdrop-blur-md">
                        共创
                      </span>
                    )}
                    {item.kind === 'cp' && (
                      <span className="absolute right-2 top-2 rounded-full bg-[#FE2C55]/90 px-2.5 py-1 text-[10px] font-black text-white shadow-sm backdrop-blur-md">
                        CP
                      </span>
                    )}
                    {item.kind === 'video' && (
                      <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/58 text-white shadow-sm backdrop-blur-md">
                        <Play size={13} className="ml-0.5 fill-current" strokeWidth={3} />
                      </span>
                    )}
	                  <div className="absolute inset-0 bg-gradient-to-t from-black/42 via-transparent to-black/5" />
	                </div>
                <div className="p-3">
                  <h3 className="line-clamp-2 text-[13px] font-black leading-snug text-[#2f261d]">{item.title}</h3>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    {item.kind === 'collab' || item.kind === 'cp' ? (
                      <div className="flex min-w-0 items-center">
                        {Array.from({ length: Math.min(5, item.topic.joinedCount) }).map((_, avatarIndex) => {
                          const name = dailyLifeUsers[(item.mediaIndex + avatarIndex) % dailyLifeUsers.length];
                          return (
                            <img
                              key={`${item.id}-creator-${name}-${avatarIndex}`}
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`}
                              alt=""
                              className={`h-5 w-5 shrink-0 rounded-full border border-white bg-[#f6ede3] ${avatarIndex > 0 ? '-ml-1.5' : ''}`}
                            />
                          );
                        })}
                        {item.topic.joinedCount > 5 && (
                          <span className="-ml-1.5 flex h-5 min-w-5 items-center justify-center rounded-full border border-white bg-[#f2e7db] px-1 text-[8px] font-black text-[#8f7f6d]">
                            +{item.topic.joinedCount - 5}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="flex min-w-0 items-center gap-1.5">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.author}`} alt="" className="h-5 w-5 shrink-0 rounded-full bg-[#f6ede3]" />
                        <span className="truncate text-[10px] font-bold text-[#8f7f6d]">{item.author}</span>
                      </div>
                    )}
                    <span className={`flex items-center gap-1 text-[10px] font-black ${isLiked ? 'text-[#FE2C55]' : 'text-[#b0a08e]'}`}>
                      <Heart size={11} className={isLiked ? 'fill-current' : ''} />
                      {item.topic.likes}
                    </span>
                  </div>
                </div>
              </button>
            );
                })}
              </div>
            ))}
          </section>
        )}
      </main>

      <AnimatePresence>
        {showGrowthPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismissGrowthPrompt}
            className="absolute inset-0 z-[120] bg-black/35 backdrop-blur-sm flex items-center justify-center p-5"
          >
            <motion.div
              initial={{ y: 28, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 28, opacity: 0, scale: 0.98 }}
              transition={{ type: 'spring', damping: 24, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[360px] rounded-[24px] bg-[#fffaf4] px-5 pt-5 pb-6 text-[#2f261d] shadow-[0_24px_70px_rgba(78,56,35,0.24)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#b4834a]">今日成长</p>
                  <h3 className="mt-1 text-2xl font-black tracking-tight">2/3 已完成</h3>
                  <p className="mt-1 text-[12px] font-bold text-[#8f7f6d]">参与一个待成圈话题，就能点亮今日记录。</p>
                </div>
                <button
                  onClick={dismissGrowthPrompt}
                  className="w-9 h-9 rounded-full bg-white text-[#7b6b5c] shadow-sm flex items-center justify-center active:scale-95 transition-transform shrink-0"
                  aria-label="关闭"
                >
                  <X size={16} />
                </button>
              </div>

              <button
                onClick={() => {
                  setSelectedTopic(featuredTopic);
                  dismissGrowthPrompt();
                  setScreen('topic-detail');
                }}
                className="mt-5 w-full rounded-[18px] bg-white px-4 py-4 text-left shadow-sm active:scale-[0.99] transition-transform"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-black text-[#8f7f6d]">最接近成圈</p>
                    <p className="mt-1 text-sm font-black text-[#2f261d]">{featuredTopic.title}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-black text-[#b4834a]">{featuredTopic.joinedCount}/{featuredTopic.targetCount}</p>
                    <p className="text-[9px] font-black text-[#aa9a86]">人数</p>
                  </div>
                </div>
                <div className="mt-4 h-2 rounded-full bg-[#ebe2d4] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#edbd79] to-[#ff2e67]"
                    style={{ width: `${Math.min(100, (featuredTopic.joinedCount / featuredTopic.targetCount) * 100)}%` }}
                  />
                </div>
              </button>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  { title: '浏览 3 个共创', done: '3/3', reward: '+20', primary: true },
                  { title: '回应一位好友', done: '0/1', reward: '+50' },
                  { title: '参与待成圈话题', done: '0/2', reward: '+100' },
                ].map((task, taskIndex) => (
                  <div
                    key={task.title}
                    className={`rounded-[16px] border px-3 py-3 text-left shadow-sm ${
                      task.primary ? 'border-[#ffbed0] bg-[#fff6f8]' : 'border-[#eadfce] bg-white'
                    }`}
                  >
                    <p className="min-h-[32px] text-[11px] font-black leading-snug text-[#4a3a2a]">{task.title}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className={`text-[10px] font-black ${task.primary ? 'text-[#FE2C55]' : 'text-[#b4834a]'}`}>{task.done}</span>
                      <span className="inline-flex items-center whitespace-nowrap rounded-full bg-[#fff1d8] px-2 py-0.5 text-[9px] font-black leading-none text-[#b4834a]">⚡ {task.reward}</span>
                    </div>
                    <button
                      onClick={() => {
                        dismissGrowthPrompt();
                        if (taskIndex === 1) {
                          setScreen('messages');
                        } else if (taskIndex === 2) {
                          setScreen('circle');
                        } else if (!task.primary) {
                          setScreen('circle');
                        }
                      }}
                      className={`mt-3 h-8 w-full rounded-full text-[10px] font-black active:scale-95 transition-transform ${
                        task.primary ? 'bg-[#FE2C55] text-white' : 'bg-[#2f261d] text-white'
                      }`}
                    >
                      {task.primary ? '领取' : '去完成'}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const HeatingConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm
}: {
  isOpen: boolean,
  onClose: () => void,
  onConfirm: () => void
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute inset-0 z-[200] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-sm bg-[#1a1a1a] rounded-[24px] border border-white/10 overflow-hidden shadow-2xl"
          >
            <div className="p-8 text-center space-y-6">
              <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto border border-gold/20">
                <Flame size={40} className="text-gold fill-gold" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">加热共创话题</h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  加热后，会有更多人能留意到该作品
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-4 text-left space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/40">消耗钻石</span>
                  <span className="text-gold font-bold">100 💎</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/40">展示时效</span>
                  <span className="text-white/80">话题成圈前有效</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 h-14 bg-white/5 text-white/60 rounded-xl font-bold text-sm active:scale-95 transition-transform"
                >
                  取消
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className="flex-1 h-14 bg-gold text-dark rounded-xl font-black text-sm active:scale-95 transition-transform"
                >
                  确认加热
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const FriendSelectionModal = ({
  isOpen,
  onClose,
  onInvite,
  remainingCount
}: {
  isOpen: boolean,
  onClose: () => void,
  onInvite: (selectedNames: string[]) => void,
  remainingCount: number
}) => {
  const [selectedFriends, setSelectedFriends] = useState<Set<string>>(new Set());

  const FRIENDS = [
    { name: '林野', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop' },
    { name: 'Mia', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop' },
    { name: '苏苏', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop' },
  ];

  const handleToggle = (name: string) => {
    setSelectedFriends(prev => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        if (next.size < remainingCount) {
          next.add(name);
        }
      }
      return next;
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-x-0 bottom-0 h-[80vh] bg-[#121212] rounded-t-[40px] z-[61] flex flex-col overflow-hidden border-t border-white/10"
          >
            <div className="p-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">选择好友</h3>
                <p className="text-xs text-white/40 mt-1">还可以邀请 {remainingCount - selectedFriends.size} 位好友</p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-2 space-y-4">
              {FRIENDS.map(friend => (
                <button
                  key={friend.name}
                  onClick={() => handleToggle(friend.name)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                    selectedFriends.has(friend.name)
                    ? 'bg-gold/10 border-gold shadow-[0_0_20px_rgba(255,184,0,0.1)]'
                    : 'bg-white/5 border-white/5'
                  }`}
                >
                  <img src={friend.avatar} alt="" className="w-12 h-12 rounded-full border-2 border-black bg-white/10" />
                  <span className="flex-1 text-left font-bold text-white">{friend.name}</span>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedFriends.has(friend.name)
                    ? 'bg-gold border-gold'
                    : 'border-white/20'
                  }`}>
                    {selectedFriends.has(friend.name) && <Check size={14} className="text-dark" />}
                  </div>
                </button>
              ))}
            </div>

            <div className="p-6 bg-dark/80 backdrop-blur-xl border-t border-white/5">
              <button
                disabled={selectedFriends.size === 0}
                onClick={() => {
                  onInvite(Array.from(selectedFriends));
                  onClose();
                }}
                className={`w-full h-14 rounded-xl font-black transition-all active:scale-95 flex items-center justify-center gap-2 ${
                  selectedFriends.size > 0
                  ? 'bg-gold text-dark'
                  : 'bg-white/10 text-white/20'
                }`}
              >
                发送邀请 {selectedFriends.size > 0 && `(${selectedFriends.size})`}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

type Visibility = 'public' | 'friends' | 'private' | 'selected';

const VisibilitySelectorDrawer = ({
  isOpen,
  onClose,
  visibility,
  setVisibility,
  selectedFriendIds,
  setSelectedFriendIds
}: {
  isOpen: boolean,
  onClose: () => void,
  visibility: Visibility,
  setVisibility: (v: Visibility) => void,
  selectedFriendIds: Set<string>,
  setSelectedFriendIds: (ids: Set<string>) => void
}) => {
  const friends = [
    { id: '1', name: '林野', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop' },
    { id: '2', name: 'Mia', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop' },
    { id: '5', name: '苏苏', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop' },
  ];

  const toggleFriend = (id: string) => {
    const next = new Set(selectedFriendIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedFriendIds(next);
  };

  const options: { id: Visibility, label: string, desc: string, icon: any }[] = [
    { id: 'public', label: '公开', desc: '所有人可见', icon: <Globe size={18} /> },
    { id: 'friends', label: '朋友', desc: '互关朋友可见', icon: <Users2 size={18} /> },
    { id: 'private', label: '私密', desc: '仅自己可见', icon: <Lock size={18} /> },
    { id: 'selected', label: '部分可见', desc: '选中的朋友可见', icon: <UserIcon size={18} /> }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[110]"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-x-0 bottom-0 bg-[#0A0A0A] rounded-t-[40px] max-h-[85vh] overflow-hidden flex flex-col z-[120] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] border-t border-white/5"
          >
            <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mt-3 mb-1 flex-shrink-0" />
            <header className="p-6 pt-2 flex items-center justify-between border-b border-white/[0.03]">
              <button onClick={onClose} className="text-white/40 font-bold text-xs uppercase tracking-widest px-2">取消</button>
              <h3 className="font-black text-white text-sm tracking-[0.3em] uppercase">谁可以看</h3>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gold text-dark rounded-full text-xs font-black shadow-lg shadow-gold/20 active:scale-95 transition-transform"
              >
                确定
              </button>
            </header>

            <div className="flex-1 overflow-y-auto no-scrollbar py-4 px-6 space-y-6 pb-20">
              <div className="space-y-2">
                {options.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setVisibility(item.id)}
                    className={`p-5 rounded-2xl border transition-all flex items-center justify-between ${visibility === item.id ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/5'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${visibility === item.id ? 'bg-gold text-dark border-gold' : 'bg-white/5 text-white/30 border-white/5'}`}>
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{item.label}</p>
                        <p className="text-[10px] text-white/30 uppercase tracking-tighter mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${visibility === item.id ? 'border-gold bg-gold' : 'border-white/10'}`}>
                      {visibility === item.id && <Check size={12} className="text-dark" strokeWidth={4} />}
                    </div>
                  </div>
                ))}
              </div>

              <AnimatePresence>
                {visibility === 'selected' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 pt-4 border-t border-white/5 overflow-hidden"
                  >
                    <label className="text-[10px] font-black uppercase text-white/40 tracking-[0.2em] ml-1">选择好友</label>
                    <div className="space-y-2">
                      {friends.map(friend => (
                        <div
                          key={friend.id}
                          onClick={() => toggleFriend(friend.id)}
                          className={`flex items-center justify-between p-4 rounded-xl border transition-all ${selectedFriendIds.has(friend.id) ? 'bg-white/10 border-white/10' : 'bg-white/5 border-white/5'}`}
                        >
                          <div className="flex items-center gap-4">
                            <img src={friend.avatar} alt="" className="w-10 h-10 rounded-full object-cover border border-white/10" />
                            <span className="font-bold text-white text-sm">{friend.name}</span>
                          </div>
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedFriendIds.has(friend.id) ? 'bg-gold border-gold' : 'border-white/10'}`}>
                            {selectedFriendIds.has(friend.id) && <Check size={14} className="text-dark" strokeWidth={3} />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const GiftDonorStack = ({ gifts, onClick }: { gifts: GiftRecord[], onClick: () => void }) => {
  const topGifts = gifts.slice(0, 3);
  const remaining = gifts.length > 3 ? gifts.length - 3 : 0;

  return (
    <button onClick={onClick} className="pointer-events-auto flex -space-x-2 items-center hover:scale-105 transition-transform bg-black/20 p-1 rounded-full border border-white/10 backdrop-blur-md">
      {topGifts.map((g, i) => (
        <img key={g.id} src={g.avatar} className="w-8 h-8 rounded-full border-2 border-dark" alt={g.userName} />
      ))}
      {remaining > 0 && (
         <div className="w-8 h-8 rounded-full bg-dark/80 text-white text-[10px] flex items-center justify-center font-bold border-2 border-dark">
           +{remaining}
         </div>
      )}
    </button>
  );
};

const GiftDonorDetailModal = ({
  isOpen,
  onClose,
  gifts
}: {
  isOpen: boolean,
  onClose: () => void,
  gifts: GiftRecord[]
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute inset-0 z-[200] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-sm bg-[#1a1a1a] rounded-[24px] border border-white/10 overflow-hidden shadow-2xl"
          >
            <div className="p-6">
              <h3 className="text-lg font-bold text-white mb-4">赠礼用户详情</h3>
                <div className="space-y-4 max-h-60 overflow-y-auto no-scrollbar">
                  {gifts.map(g => (
                    <div key={g.id} className="flex items-center gap-3">
                      <img src={g.avatar} className="w-10 h-10 rounded-full" alt={g.userName} />
                      <div className="flex-1">
                        <p className="text-sm font-bold text-white">{g.userName}</p>
                        <p className="text-xs text-white/50">{g.giftName}</p>
                      </div>
                      <span className="text-sm font-black text-gold">{g.giftValue}</span>
                    </div>
                  ))}
                </div>
              <button
                onClick={onClose}
                className="w-full mt-6 h-12 bg-white/5 text-white/60 rounded-xl font-bold text-sm active:scale-95 transition-transform"
              >
                关闭
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const TopicDetail = ({ topic, setScreen, prevScreen, toggleFavorite, isFavorite, toggleLike, isLiked, setSelectedTopic, setSelectedUserName, showToast, isSpotlighted, spotlightTopic, userVlogs, deleteVlog, setCircleInitialTopicInfo, setReportTargetName, setReportType }: {
  topic: Topic,
  setScreen: (s: Screen) => void,
  prevScreen: Screen,
  toggleFavorite: (id: string) => void,
  isFavorite: boolean,
  toggleLike: (id: string) => void,
  isLiked: boolean,
  setSelectedTopic: (topic: Topic) => void,
  setSelectedUserName: (name: string) => void,
  showToast: (m: string) => void,
  isSpotlighted: boolean,
  spotlightTopic: (id: string) => void,
  userVlogs: UserVlog[],
  deleteVlog: (id: string) => void,
  setCircleInitialTopicInfo: (info: Partial<Topic> | undefined) => void,
  setReportTargetName: (name: string) => void,
  setReportType: (type: 'account' | 'video') => void
}) => {
  const [isCreatorsExpanded, setIsCreatorsExpanded] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isHeatingModalOpen, setIsHeatingModalOpen] = useState(false);
  const [isGiftDonorModalOpen, setIsGiftDonorModalOpen] = useState(false);
  const [isGiftDonorDetailModalOpen, setIsGiftDonorDetailModalOpen] = useState(false);
  const [isVisibilityDrawerOpenForClips, setIsVisibilityDrawerOpenForClips] = useState(false);
  const [editingClipId, setEditingClipId] = useState<string | null>(null);
  const [clipVisibility, setClipVisibility] = useState<Visibility>('public');
  const [selectedFriendIds, setSelectedFriendIds] = useState<Set<string>>(new Set());
  const [selectedShareUserIds, setSelectedShareUserIds] = useState<Set<string>>(new Set());
  const [isDeletingClip, setIsDeletingClip] = useState(false);
  const [clipToDelete, setClipToDelete] = useState<string | null>(null);
  const [isShareDrawerOpen, setIsShareDrawerOpen] = useState(false);

  const remainingCount = topic.targetCount - topic.joinedCount;
  const progressPercent = Math.min(100, (topic.joinedCount / topic.targetCount) * 100);
  const userTopicClips = userVlogs.filter(v => v.topicId === topic.id);
  const visibleCreatorSlots = isCreatorsExpanded ? topic.targetCount : Math.min(topic.targetCount, 8);
  const topicGifts = MOCK_GIFT_RECORDS.filter(g => g.topicId === topic.id);

  const toggleShareUser = (id: string) => {
    const next = new Set(selectedShareUserIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedShareUserIds(next);
  };

  const shareDrawer = (
    <AnimatePresence>
      {isShareDrawerOpen && (
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           onClick={(e) => { e.stopPropagation(); setIsShareDrawerOpen(false); }}
           className="absolute inset-0 z-[100] bg-black/60 backdrop-blur-sm flex flex-col justify-end"
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#111111] rounded-t-[32px] pt-6 pb-12 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] border-t border-white/5"
          >
              <div className="flex justify-between items-center px-6 mb-4">
                <h3 className="text-white text-sm font-black tracking-[0.2em] uppercase">分享给好友</h3>
                <button
                  onClick={() => setIsShareDrawerOpen(false)}
                  className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full text-white/40 active:scale-95 transition-transform"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Multi-select Friends List */}
              <div className="flex gap-4 overflow-x-auto no-scrollbar px-6 pb-2">
                {SHARE_FRIENDS.map((friend) => (
                  <button
                    key={friend.id}
                    className="flex flex-col items-center gap-2 min-w-[64px] group relative"
                    onClick={() => toggleShareUser(friend.id)}
                  >
                    <div className={`w-14 h-14 rounded-full overflow-hidden border-2 transition-all p-0.5 active:scale-95 ${
                      selectedShareUserIds.has(friend.id) ? 'border-red-primary bg-red-primary/10' : 'border-white/5 bg-white/5'
                    }`}>
                      <img src={friend.avatar} alt={friend.name} className="w-full h-full rounded-full object-cover" />
                    </div>
                    {/* Checkbox Overlay */}
                    <div className={`absolute top-0 right-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedShareUserIds.has(friend.id)
                        ? 'bg-red-primary border-red-primary opacity-100 scale-100'
                        : 'bg-black/20 border-white/20 opacity-40 scale-75'
                    }`}>
                      {selectedShareUserIds.has(friend.id) && <Check size={12} className="text-white" strokeWidth={4} />}
                    </div>
                    <span className={`text-[10px] font-black tracking-tight transition-colors ${
                      selectedShareUserIds.has(friend.id) ? 'text-white' : 'text-white/40'
                    }`}>
                      {friend.name}
                    </span>
                  </button>
                ))}
              </div>

              {/* Action Bar / Send Button */}
              <AnimatePresence>
                {selectedShareUserIds.size > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="px-6 py-2"
                  >
                    <button
                      onClick={() => {
                        showToast(`已向 ${selectedShareUserIds.size} 位好友发送邀请`);
                        setIsShareDrawerOpen(false);
                      }}
                      className="w-full h-14 bg-red-primary text-white rounded-xl font-black uppercase text-xs shadow-[0_10px_30px_rgba(255,36,66,0.3)] active:scale-95 transition-transform"
                    >
                      发送给 {selectedShareUserIds.size} 位好友
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="h-px bg-white/5 w-full mx-auto max-w-[80%] my-2" />

	              {/* Other Sharing Channels */}
	              <div className="flex gap-6 overflow-x-auto no-scrollbar px-6 pb-2">
	                {[
	                  { key: 'drawer1-report', icon: AlertTriangle, label: '举报话题', action: () => { setReportType('video'); setReportTargetName(topic.title); setIsShareDrawerOpen(false); setScreen('report-user'); } },
	                ].map((item) => (
                  <button key={item.key} className="flex flex-col items-center gap-2 group shrink-0" onClick={item.action}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center active:scale-95 transition-transform bg-white/5 border border-white/10 text-white/60">
	                      <item.icon size={20} />
                    </div>
                    <span className="text-[9px] font-black text-white/40 group-active:text-white uppercase tracking-tighter text-center max-w-[58px] leading-tight">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (topic.status !== 'completed') {
    return (
      <div className="flex h-full flex-col overflow-hidden bg-[#f7f3ec] pt-8 text-[#2f261d]">
        <main className="flex-1 overflow-y-auto no-scrollbar px-4 py-5">
          <div className="flex min-h-full flex-col justify-center">
          <motion.div
            layoutId={`topic-card-${topic.id}`}
            className="relative z-10 overflow-hidden rounded-[24px] border border-[#eadfce] bg-white shadow-[0_20px_44px_rgba(103,81,58,0.14)]"
          >
            <div className="relative h-[360px] overflow-hidden bg-black">
              <img src={topic.image || dailyLifeFrames[0]} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/8 to-black/12" />
              <button
                onClick={() => setScreen(prevScreen || 'home')}
                className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/24 bg-black/22 text-white backdrop-blur-md active:scale-95 transition-transform"
                aria-label="关闭详情"
              >
                <X size={20} />
              </button>
              <div className="absolute right-4 top-4 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(topic.id);
                  }}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md active:scale-95 transition-all ${
                    isFavorite ? 'border-[#d6b27e] bg-[#d6b27e] text-white' : 'border-white/24 bg-black/22 text-white'
                  }`}
                  aria-label={isFavorite ? '取消收藏' : '收藏'}
                >
                  <Star size={18} className={isFavorite ? 'fill-current' : ''} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setIsShareDrawerOpen(true); }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/24 bg-black/22 text-white backdrop-blur-md active:scale-95"
                  aria-label="分享话题"
                >
                  <CornerUpRight size={18} />
                </button>
              </div>
              <div className="absolute bottom-6 left-5 right-5 text-white">
                <h1 className="text-[34px] font-black leading-[0.98] drop-shadow-[0_3px_12px_rgba(0,0,0,0.58)]">{topic.title}</h1>
              </div>
            </div>

            <HeatingConfirmationModal
              isOpen={isHeatingModalOpen}
              onClose={() => setIsHeatingModalOpen(false)}
              onConfirm={() => spotlightTopic(topic.id)}
            />

            <GiftDonorDetailModal
              isOpen={isGiftDonorDetailModalOpen}
              onClose={() => setIsGiftDonorDetailModalOpen(false)}
              gifts={topicGifts}
            />

            <div className="space-y-4 px-5 py-5">
              <p className="text-[14px] font-bold leading-relaxed text-[#5f5145]">
                {topic.description}
              </p>

              <div className="space-y-4">
                 <div>
                   <div className="flex items-center justify-between mb-3">
                     <h4 className="text-[10px] font-black text-[#9b8a79]">共创进度</h4>
                     <span className="text-[11px] font-black text-[#b4834a]">{topic.joinedCount}/{topic.targetCount}</span>
                   </div>
                   <div className="h-2 w-full bg-[#eadfce] rounded-full overflow-hidden mb-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        className="h-full bg-[#FE2C55] rounded-full"
                      />
                   </div>
                   <div className="flex justify-between items-center">
                     <p className="text-[11px] font-bold text-[#8f7f6d]">
                       还差 <span className="text-[#2f261d]">{topic.targetCount - topic.joinedCount}</span> 位共创者即可成圈
                     </p>
                   </div>
                 </div>

                 <div className="flex items-center justify-between gap-3 pb-2">
                   <div className="flex -space-x-2 min-w-0">
                     {Array.from({ length: Math.min(topic.joinedCount, 8) }).map((_, i) => (
                       <button
                         key={i}
                         onClick={(e) => {
                           e.stopPropagation();
                           setSelectedUserName(`共创者 ${i + 1}`);
                           setScreen('user-profile');
                         }}
                         className="w-9 h-9 rounded-full border-2 border-white bg-[#f6ede3] overflow-hidden active:scale-90 transition-transform relative z-10"
                       >
                         <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${topic.id + i}`} alt="" className="w-full h-full object-cover" />
                       </button>
                     ))}
                   </div>
                   <button
                     onClick={() => setIsCreatorsExpanded(true)}
                     className="shrink-0 h-10 px-4 rounded-full bg-[#f7f3ec] border border-[#eadfce] text-[10px] font-black text-[#8f7f6d] active:scale-95 transition-transform"
                   >
                     查看共创人
                   </button>
                 </div>

                 <div>
                   {userTopicClips.length === 0 ? (
                     <button
                       onClick={() => {
                          setScreen('join');
                       }}
                       className="w-full h-14 bg-[#FE2C55] text-white rounded-full shadow-[0_12px_26px_rgba(254,44,85,0.22)] active:scale-95 transition-all flex items-center justify-center gap-2.5"
                     >
                       <ImageIcon size={18} />
                       <div className="flex flex-col items-start leading-tight">
                         <span className="text-sm font-black">参与共创</span>
                         <span className="text-[10px] text-white/80">拍下此刻</span>
                       </div>
                     </button>
                   ) : (
                     <button
                       onClick={() => setIsInviteModalOpen(true)}
                       className="w-full h-14 bg-[#f7f3ec] border border-[#eadfce] text-[#2f261d] rounded-full font-black text-sm active:scale-95 transition-all flex items-center justify-center gap-2.5"
                     >
                       <UserPlus size={18} />
                       <span className="text-sm">邀请好友加入</span>
                     </button>
                   )}
                 </div>
              </div>

              {userTopicClips.length > 0 && (
                <div className="flex flex-col items-center gap-1 pt-4 opacity-50">
                  <p className="text-[9px] font-black text-[#9b8a79] tracking-[0.2em] uppercase">下滑查看拍摄记录</p>
                  <ChevronDown size={12} className="text-[#9b8a79] animate-bounce" />
                </div>
              )}
            </div>
	          </motion.div>
          </div>

	          <AnimatePresence>
            {userTopicClips.length > 0 && (
              <motion.div
                key="user-clips"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-8 space-y-4"
              >
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-xs font-black text-[#9b8a79] uppercase tracking-widest">我的拍摄记录</h3>
                  <span className="text-[10px] text-[#b4834a] font-bold">{userTopicClips.length} 个片段</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {userTopicClips.map((clip) => (
                    <div key={clip.id} className="aspect-[4/3] rounded-[18px] bg-white border border-[#eadfce] relative overflow-hidden group">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Camera size={24} className="text-[#d8cdbc]" />
                      </div>
                      <div className="absolute top-2 right-2 flex gap-1 z-20">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingClipId(clip.id);
                            setIsVisibilityDrawerOpenForClips(true);
                          }}
                          className="w-7 h-7 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#8f7f6d] border border-[#eadfce] transition-all active:scale-95"
                        >
                          <Lock size={12} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setClipToDelete(clip.id);
                            setIsDeletingClip(true);
                          }}
                          className="w-7 h-7 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-rose-500 border border-[#eadfce] transition-all active:scale-95"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 text-center">
                        <p className="text-[9px] font-bold text-[#8f7f6d] truncate tracking-wide">已录制 · 待解锁</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            <AnimatePresence>
              {isDeletingClip && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-8"
                  onClick={() => setIsDeletingClip(false)}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-sm bg-[#121212] rounded-[24px] p-8 border border-white/10 shadow-2xl space-y-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 mx-auto">
                      <Trash2 size={32} />
                    </div>
                    <div className="text-center space-y-2">
                      <h3 className="text-lg font-bold text-white">您确定要删除该作品吗？</h3>
                      <p className="text-xs text-white/40 leading-relaxed">删除后将无法恢复，且您在该话题中的贡献片段将被移除。</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setIsDeletingClip(false)}
                        className="h-12 rounded-xl bg-white/5 text-white/60 font-bold active:scale-95 transition-transform"
                      >
                        取消
                      </button>
                      <button
                        onClick={() => {
                          if (clipToDelete) {
                            deleteVlog(clipToDelete);
                            showToast('片段已删除');
                          }
                          setIsDeletingClip(false);
                        }}
                        className="h-12 rounded-xl bg-rose-500 text-white font-bold shadow-lg shadow-rose-500/20 active:scale-95 transition-transform"
                      >
                        确认删除
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            {isCreatorsExpanded && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsCreatorsExpanded(false)}
                  className="absolute inset-0 bg-[#2f261d]/35 backdrop-blur-sm z-[50]"
                />
                <motion.div
                  key="creators-expanded"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="absolute inset-x-0 bottom-0 h-[85vh] bg-[#f7f3ec] rounded-t-[40px] z-[51] flex flex-col overflow-hidden border-t border-[#eadfce]"
                >
                  <div className="p-6 flex items-center justify-between border-b border-[#eadfce]">
                    <div>
                      <h3 className="text-xl font-bold text-[#2f261d] tracking-wide">全部共创者</h3>
                      <p className="text-[10px] text-[#9b8a79] mt-1 uppercase tracking-widest">还差 {remainingCount} 个共创人成圈</p>
                    </div>
                    <button
                      onClick={() => setIsCreatorsExpanded(false)}
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#8f7f6d] border border-[#eadfce]"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {Array.from({ length: topic.joinedCount }).map((_, i) => (
                      <div
                        key={`joined-${topic.id}-${i}`}
                        onClick={() => {
                          setSelectedUserName(`共创者 ${i + 1}`);
                          setScreen('user-profile');
                        }}
                        className="flex items-center gap-4 bg-white border border-[#eadfce] p-4 rounded-2xl active:scale-[0.98] transition-transform cursor-pointer"
                      >
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${topic.id + i}`}
                          alt=""
                          className="w-12 h-12 rounded-full border-2 border-white bg-[#f6ede3]"
                        />
                        <div className="flex-1">
                          <h4 className="font-bold text-[#2f261d]">共创者 {i + 1}</h4>
                          <p className="text-[10px] text-[#9b8a79] uppercase tracking-tighter">已上传共创片段</p>
                        </div>
                        <ChevronRight size={16} className="text-[#c0b09d]" />
                      </div>
                    ))}

                    {Array.from({ length: remainingCount }).map((_, i) => (
                      <div
                        key={`empty-${i}`}
                        className="flex items-center gap-4 bg-white/50 border border-dashed border-[#d8cdbc] p-4 rounded-2xl"
                      >
                        <div className="w-12 h-12 rounded-full border-2 border-dashed border-[#d8cdbc] flex items-center justify-center">
                          <UserIcon size={20} className="text-[#c0b09d]" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-[#9b8a79] italic">虚位以待</h4>
                          <p className="text-[10px] text-[#c0b09d] uppercase tracking-tighter">等待共创者加入</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 bg-white/80 backdrop-blur-xl border-t border-[#eadfce]">
                    <button
                      onClick={() => setIsInviteModalOpen(true)}
                      className="w-full h-14 bg-[#2f261d] text-white font-black rounded-xl shadow-xl active:scale-95 transition-transform flex items-center justify-center gap-2"
                    >
                      <UserPlus size={18} />
                      邀请好友
                    </button>
                    <div className="mt-4 text-center">
                      <p className="text-[10px] text-[#9b8a79] font-medium">邀请好友加入，成圈后解锁集体记忆</p>
                    </div>
                  </div>
                </motion.div>

                <FriendSelectionModal
                  isOpen={isInviteModalOpen}
                  onClose={() => setIsInviteModalOpen(false)}
                  remainingCount={remainingCount}
                  onInvite={(friends) => {
                    showToast(`已向 ${friends.length} 位好友发送邀请`);
                    setIsInviteModalOpen(false);
                  }}
                />
              </>
            )}
            <VisibilitySelectorDrawer
              isOpen={isVisibilityDrawerOpenForClips}
              onClose={() => setIsVisibilityDrawerOpenForClips(false)}
              visibility={clipVisibility}
              setVisibility={setClipVisibility}
              selectedFriendIds={selectedFriendIds}
              setSelectedFriendIds={setSelectedFriendIds}
            />
          </AnimatePresence>
        </main>
        {shareDrawer}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-dark pt-8">
      <header className="p-6 flex items-center justify-between sticky top-0 bg-dark/80 backdrop-blur-xl z-20 border-b border-white/[0.03]">
        <button onClick={() => setScreen(prevScreen || 'home')} className="w-10 h-10 glass-pill rounded-xl flex items-center justify-center">
          <X size={14} className="text-white" />
        </button>
          <div className="flex-1 flex items-center justify-between px-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <h2 className="font-bold tracking-tight text-white">话题详情</h2>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
              <span className={`px-2 py-0.5 rounded-full text-[8px] font-black tracking-widest uppercase ${
                topic.status === 'completed' ? 'bg-green-500/10 text-green-400' : 'bg-gold/10 text-gold'
              }`}>
                {topic.status === 'completed' ? `${topic.joinedCount}人共创` : '待成圈'}
              </span>
            </div>
          </div>
        </div>
        {topic.status === 'completed' ? (
          <button onClick={() => setIsShareDrawerOpen(true)} className="w-10 h-10 glass-pill rounded-xl flex items-center justify-center">
            <CornerUpRight size={20} className="text-white" />
          </button>
        ) : (
          <button
            onClick={(e) => {
                e.stopPropagation();
                setIsHeatingModalOpen(true);
            }}
            className={`h-10 px-4 rounded-xl flex items-center gap-1.5 transition-all text-xs font-black uppercase border shadow-lg ${
              isSpotlighted ? 'bg-gold text-dark border-gold' : 'glass-pill text-gold border-gold/30 hover:bg-gold/10 active:scale-95'
            }`}
          >
            <Flame size={14} className={isSpotlighted ? 'fill-current' : 'fill-none'} />
          </button>
        )}
        <HeatingConfirmationModal
          isOpen={isHeatingModalOpen}
          onClose={() => setIsHeatingModalOpen(false)}
          onConfirm={() => spotlightTopic(topic.id)}
        />
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar">
        <div className={`p-4 pb-4 bg-gradient-to-b ${
          topic.tone === 'blue' ? 'from-indigo-500/20' :
          topic.tone === 'amber' ? 'from-amber-500/20' : 'from-emerald-500/20'
        } to-dark space-y-2 relative`}>
          <div className="absolute inset-0 opacity-10 pointer-events-none"
               style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, white 0%, transparent 100%)' }}></div>

          <div className="flex items-center justify-between z-10 relative">
             <div className="flex flex-col gap-0.5">
               <div className="flex items-center gap-3">
                 <h1 className="text-xl font-bold leading-tight text-white">{topic.title}</h1>
               </div>
               <div className="flex items-center gap-2">
                 <p className="text-white/40 text-[10px] line-clamp-1">{topic.description}</p>
               </div>
             </div>
          </div>
        </div>

        <section className="px-6 space-y-8 -mt-2 pb-32">
          {topic.status === 'completed' && (
            <div className="space-y-6 pt-2">
              <div className="relative group cursor-pointer overflow-hidden rounded-[28px] border border-white/5 bg-black shadow-2xl" onClick={() => showToast('即将开始播放完整共创作品...')}>
                <div className="grid grid-cols-2 gap-0.5">
                  {Array.from({ length: Math.min(topic.targetCount, 4) }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-[3/4] bg-dark relative overflow-hidden group/item"
                    >
                      <img src={dailyLifeFrames[i]} alt="" className="absolute inset-0 h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/10" />
                      <div className="absolute top-3 left-3 px-2 py-1 bg-black/40 backdrop-blur-sm rounded-lg border border-white/5">
                        <p className="text-[9px] font-black text-white/50 tracking-tighter uppercase">Scene {i+1}</p>
                      </div>

                      <div className="absolute bottom-3 left-3 flex items-center gap-2">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=User${topic.id + i}`} alt="" className="w-5 h-5 rounded-full border border-white/20 shadow-sm" />
                        <span className="text-[9px] font-bold text-white/60 tracking-wider">@{i % 2 === 0 ? 'Soul' : 'Echo'}</span>
                      </div>
                    </div>
                  ))}
                  {topic.targetCount > 4 && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                       <span className="bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-[11px] font-black text-white/90 tracking-widest uppercase shadow-xl">
                         +{topic.targetCount - 4} MORE
                       </span>
                    </div>
                  )}
                </div>

                {/* Large Central Play Button */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-16 h-16 rounded-full bg-gold/90 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)] border border-white/20 transform group-active:scale-95 transition-all">
                    <Zap size={28} className="text-dark fill-dark ml-0.5" />
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                   <p className="text-[9px] font-black text-gold tracking-widest uppercase">{topic.targetCount}位共创人集结</p>
                </div>
              </div>

              <div className="flex items-center justify-between bg-white/[0.03] p-5 rounded-[24px] border border-white/5 backdrop-blur-xl">
                 <div className="flex flex-col gap-2">
                   <div className="flex items-center gap-2 bg-white/5 w-fit px-3 py-1.5 rounded-lg border border-white/5">
                     <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                     <p className="text-[11px] font-black text-white tracking-[0.1em] uppercase">作品已就绪</p>
                   </div>
                 </div>
                 <button
                  onClick={() => setScreen('gift')}
                  className="flex items-center gap-2 bg-white text-dark px-5 py-3 rounded-[16px] font-black text-[11px] uppercase shadow-xl active:scale-95 transition-all hover:bg-gold hover:text-dark"
                >
                  <Gift size={14} />
                  赏爆它
                </button>
              </div>
            </div>
          )}

          {topic.status === 'completed' && (
            <div className="flex items-center p-4 bg-card bento-card border border-white/5 shadow-2xl relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 overflow-hidden shrink-0">
                 <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${topic.creator}`} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-bold leading-none text-white">DR官方</p>
                <p className="text-[10px] text-white/30 font-black uppercase tracking-widest mt-1.5">官方发起话题 · {topic.city}</p>
              </div>
              <ChevronRight size={16} className="text-white/10" />
            </div>
          )}

          {topic.status !== 'completed' ? (
            <div className="space-y-4">
              <div className={`relative overflow-hidden rounded-[32px] border border-white/15 px-6 pt-6 pb-5 shadow-2xl min-h-[520px] flex flex-col justify-between bg-gradient-to-br ${
                topic.tone === 'blue' ? 'from-indigo-600 via-indigo-950' :
                topic.tone === 'amber' ? 'from-amber-600 via-amber-950' : 'from-emerald-600 via-emerald-950'
              } to-black`}>
                {topic.image && (
                  <img src={topic.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-55 blur-xl scale-110" />
                )}
                <div className="absolute inset-0 bg-black/35 pointer-events-none" />
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/25 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />

                <div className="relative z-10 flex items-start justify-between gap-3">
                  <div className="flex flex-wrap gap-2 min-w-0">
                    <span className="rounded-full bg-white/12 border border-white/10 px-3 py-1.5 text-[10px] font-black text-white/80 tracking-widest">
                      {topic.city}
                    </span>
                    <span className="rounded-full bg-gold/15 border border-gold/20 px-3 py-1.5 text-[10px] font-black text-gold tracking-widest">
                      待成圈
                    </span>
                  </div>
                  <div className="shrink-0 rounded-xl bg-black/25 border border-white/10 px-3 py-2 text-right backdrop-blur-md">
                    <p className="text-[8px] font-black text-white/35 tracking-widest">剩余</p>
                    <p className="text-sm font-black text-red-primary mt-0.5">{topic.deadline}</p>
                  </div>
                </div>

                <div className="relative z-10 space-y-5">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 w-fit rounded-full bg-white/10 border border-white/10 py-1.5 pl-1.5 pr-3 backdrop-blur-md">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${topic.creator}`} alt="" className="w-7 h-7 rounded-full bg-white/10" />
                      <span className="text-[10px] font-black text-white/70 tracking-widest">DR官方话题</span>
                    </div>

                    <div>
                      <p className="text-[10px] font-black text-white/45 tracking-widest uppercase mb-2">{topic.mode} · {topic.durationLimit || 15}s</p>
                      <h3 className="text-4xl font-black leading-[0.95] text-white tracking-tight">{topic.title}</h3>
                      <p className="text-sm text-white/70 leading-relaxed mt-4">{topic.description}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-[20px] bg-white/10 border border-white/10 p-4 backdrop-blur-md">
                      <div className="flex items-end justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-[10px] font-black text-white/45 tracking-widest uppercase">还差 {remainingCount} 人解锁</p>
                          <div className="mt-2 h-2 rounded-full bg-white/15 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${progressPercent}%` }}
                              className="h-full rounded-full bg-gold"
                            />
                          </div>
                        </div>
                        <div className="shrink-0 flex items-baseline gap-1">
                          <span className="text-4xl font-black text-white leading-none">{topic.joinedCount}</span>
                          <span className="text-lg font-black text-white/35">/{topic.targetCount}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <div className="flex -space-x-2 min-w-0">
                        {Array.from({ length: Math.min(topic.joinedCount, 5) }).map((_, i) => (
                          <button
                            key={`creator1-${topic.id}-${i}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedUserName(`共创者 ${i + 1}`);
                              setScreen('user-profile');
                            }}
                            className="w-9 h-9 rounded-full border-2 border-black bg-white/10 overflow-hidden active:scale-90 transition-transform"
                          >
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${topic.id + i}`} alt="" className="w-full h-full object-cover" />
                          </button>
                        ))}
                        {Array.from({ length: Math.min(remainingCount, 3) }).map((_, i) => (
                          <div key={`empty-${i}`} className="w-9 h-9 rounded-full border-2 border-black bg-white/10 flex items-center justify-center">
                            <Plus size={13} className="text-white/35" />
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => setIsCreatorsExpanded(prev => !prev)}
                        className="shrink-0 h-10 px-4 rounded-full bg-white/10 border border-white/10 text-[10px] font-black text-white/60 active:scale-95 transition-transform"
                      >
                        {isCreatorsExpanded ? '收起共创人' : '查看共创人'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {isCreatorsExpanded && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="rounded-[20px] bg-card border border-white/5 p-4 space-y-4 shadow-xl"
                  >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-black text-white tracking-wide">全部共创人</h3>
                    <p className="text-[10px] text-white/30 mt-1">满员后同步解锁所有人的素材。</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {Array.from({ length: visibleCreatorSlots }).map((_, i) => (
                    i < topic.joinedCount ? (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedUserName(`共创者 ${i + 1}`);
                          setScreen('user-profile');
                        }}
                        className="aspect-square rounded-[16px] bg-white/5 border border-white/10 overflow-hidden active:scale-90 transition-transform relative shadow-lg"
                      >
                        <img src={dailyLifeFrames[i % dailyLifeFrames.length]} alt="" className="absolute inset-0 h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${topic.id + i}`} alt="" className="absolute left-1.5 top-1.5 h-6 w-6 rounded-full border border-white/40 bg-white/80 object-cover" />
                        <span className="absolute bottom-1 left-1 right-1 rounded-full bg-black/45 py-0.5 text-[7px] font-black text-white/75 backdrop-blur-sm">已加入</span>
                      </button>
                    ) : (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsInviteModalOpen(true);
                        }}
                        className="aspect-square rounded-[16px] border border-white/10 bg-white/[0.025] overflow-hidden active:scale-90 transition-transform relative shadow-lg"
                      >
                        <img src={dailyLifeFrames[i % dailyLifeFrames.length]} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" />
                        <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px]" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-white">
                          <Plus size={17} strokeWidth={3} />
                          <span className="text-[8px] font-black">邀请好友</span>
                        </div>
                      </button>
                    )
                  ))}
                </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="bg-black/5 rounded-[24px] p-6 space-y-6 border border-white/[0.03] shadow-xl">
              <div className="flex justify-between items-center px-1">
                  <h4 className="font-bold flex items-center gap-2 text-white text-sm">
                    <MessageCircle size={16} /> 话题评论 <span className="text-white/20 ml-1 text-xs">{topic.likes}+</span>
                  </h4>
              </div>
              <div className="space-y-4">
                  {[
                    { name: '南川', text: '这种拼在一起的日常很有生命力。', time: '12h' },
                    { name: 'Echo', text: '比普通 vlog 更像一群人的共同记忆。', time: '15h' }
                  ].map((cmt, i) => (
                    <div key={cmt.name} className="flex gap-3 group">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${cmt.name}`} alt="" className="w-8 h-8 rounded-full bg-white/5 shrink-0 object-cover border border-white/5" />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-[10px] font-black text-white/30 uppercase tracking-tighter">{cmt.name}</p>
                            <span className="text-[8px] font-bold text-white/10 uppercase">{cmt.time} · IP：{['广东', '四川', '浙江', '江苏', '北京', '上海'][i % 6]}</span>
                          </div>
                          <p className="text-xs text-white/80 leading-relaxed italic border-l-2 border-white/5 pl-3 py-0.5">{cmt.text}</p>
                        </div>
                    </div>
                  ))}
              </div>
              <div className="mt-4 flex gap-2">
                 <input
                   className="flex-1 h-11 bg-white/5 border border-white/10 rounded-[16px] px-5 text-xs font-bold focus:border-white/30 outline-none transition-all placeholder:text-white/10"
                   placeholder="留下你的共创注脚..."
                 />
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="p-6 pt-2 bg-dark/80 backdrop-blur-md border-t border-white/[0.03]">
        {topic.status !== 'completed' && (
          <p className="text-[10px] text-white/40 text-center font-medium mb-3">
             加入话题后，该话题的收益将由同圈创作者评分
          </p>
        )}
        <div className="flex gap-2">
          <button
            onClick={() => toggleFavorite(topic.id)}
            className={`flex-1 h-14 rounded-[18px] font-black text-xs uppercase transition-all active:scale-95 shadow-xl flex items-center justify-center gap-2 ${
              isFavorite ? 'bg-gold text-dark shadow-gold/20' : 'bg-white/5 text-white/40 border border-white/5'
            }`}
          >
            <Star size={16} className={isFavorite ? 'fill-current' : ''} />
            <span>{isFavorite ? '已收藏' : '收藏作品'}</span>
          </button>

          {topic.status !== 'completed' ? (
            <>
              <button
                onClick={() => setScreen('join')}
                className={`flex-[1.5] h-14 bg-red-primary text-white font-black rounded-[18px] shadow-[0_10px_25px_-5px_rgba(255,36,66,0.5)] active:scale-95 transition-all text-xs uppercase flex items-center justify-center gap-2`}
              >
                参与共创
              </button>
              <button onClick={() => showToast('进入拍摄后完成你的共创片段')} className="flex-1 h-14 bg-white/5 text-white/40 font-black rounded-[18px] text-xs uppercase border border-white/5 active:scale-95 flex items-center justify-center">
                拍摄
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setScreen('gift')}
                className="flex-[1.5] h-14 bg-gold text-dark font-black rounded-[18px] shadow-[0_10px_25px_-5px_rgba(214,178,126,0.5)] active:scale-95 transition-all text-xs uppercase flex items-center justify-center gap-2"
              >
                赠送作品
              </button>
              <button onClick={() => setIsShareDrawerOpen(true)} className="flex-[1] h-14 bg-white/5 text-white/40 font-black rounded-[18px] text-xs uppercase border border-white/5 active:scale-95 flex items-center justify-center">
                分享
              </button>
            </>
          )}
        </div>
      </footer>
      <VisibilitySelectorDrawer
        isOpen={isVisibilityDrawerOpenForClips}
        onClose={() => setIsVisibilityDrawerOpenForClips(false)}
        visibility={clipVisibility}
        setVisibility={setClipVisibility}
        selectedFriendIds={selectedFriendIds}
        setSelectedFriendIds={setSelectedFriendIds}
      />
      {shareDrawer}
    </div>
  );
};

// --- Me (Profile) Screen ---

const NetworkListScreen = ({
  setScreen,
  prevScreen,
  initialTab,
  userName = "Wesley"
}: {
  setScreen: (s: Screen) => void,
  prevScreen: Screen,
  initialTab: 'friends' | 'followers' | 'following',
  userName?: string
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchQuery, setSearchQuery] = useState('');

  const users = [
    { id: '1', name: '林野', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop', bio: '记录生活的碎片', isFollowing: true, followsMe: true },
    { id: '2', name: 'Mia', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop', bio: 'Stay curious.', isFollowing: true, followsMe: true },
    { id: '3', name: '周屿', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=128&h=128&fit=crop', bio: '捕风者', isFollowing: false, followsMe: true },
    { id: '4', name: '张震', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&fit=crop', bio: '光影记录家', isFollowing: true, followsMe: false },
    { id: '5', name: '苏苏', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop', bio: '正在努力共创中', isFollowing: true, followsMe: true },
    { id: '6', name: 'Echo', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Echo', bio: '灵感捕捉机', isFollowing: false, followsMe: true },
  ];

  const filteredByTab = users.filter(u => {
    if (activeTab === 'friends') return u.isFollowing && u.followsMe;
    if (activeTab === 'following') return u.isFollowing;
    if (activeTab === 'followers') return u.followsMe;
    return true;
  });

  const filteredUsers = filteredByTab.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className={lightPageRootPadded}>
      <header className={lightHeaderShell}>
        <button onClick={() => setScreen(prevScreen)} className={lightIconButton}>
          <ArrowLeft size={20} />
        </button>
        <div className="flex gap-4">
          {[
            { id: 'friends', label: '朋友' },
            { id: 'following', label: '关注' },
            { id: 'followers', label: '粉丝' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`text-sm font-bold relative pb-1 transition-colors ${activeTab === tab.id ? 'text-[#2f261d]' : 'text-[#b0a08e]'}`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FE2C55] rounded-full" />
              )}
            </button>
          ))}
        </div>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-10">
        <div className="p-6">
          <div className="relative group mb-6">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b0a08e] group-focus-within:text-[#FE2C55] transition-colors" />
            <input
              type="text"
              placeholder="搜索用户..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full h-12 rounded-xl pl-12 pr-4 text-sm font-medium outline-none focus:border-[#FE2C55]/20 transition-all ${lightInputField}`}
            />
          </div>

          <div className="space-y-3">
            {filteredUsers.map(user => (
              <div
                key={user.id}
                className={`flex items-center gap-4 p-4 active:bg-[#faf4ec] transition-all group ${lightSurfaceCard}`}
                onClick={() => setScreen('user-profile')}
              >
                <img src={user.avatar} alt="" className="w-12 h-12 rounded-xl border border-[#eadfce] object-cover" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-[#2f261d] text-sm truncate">{user.name}</h4>
                  <p className="text-[10px] text-[#8f7f6d] mt-1 truncate tracking-wide">{user.bio}</p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); }}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    user.isFollowing ? 'bg-[#f6ede3] text-[#8f7f6d] border border-[#eadfce]' : 'bg-[#FE2C55] text-white shadow-[0_10px_24px_rgba(254,44,85,0.18)]'
                  }`}
                >
                  {user.isFollowing && user.followsMe ? '互相关注' : user.isFollowing ? '已关注' : '关注'}
                </button>
              </div>
            ))}
            {filteredUsers.length === 0 && (
              <div className="py-20 text-center space-y-4 opacity-50">
                <div className="w-16 h-16 bg-white/82 rounded-full flex items-center justify-center mx-auto text-[#d7c6b2] border border-[#eadfce]">
                  <UserIcon size={32} />
                </div>
                <p className="text-[10px] text-[#b0a08e] font-black uppercase tracking-[0.2em]">暂无相关成果</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const MeScreen = ({ setScreen, profile, diamondBalance, energyBalance, likedCount, savedCount, worksCount, setInitialNetworkTab, setSelectedTopic, setCircleIsMyWorkMode, setCircleInitialTopicId }: {
  setScreen: (s: Screen) => void,
  profile: EditableProfile,
  diamondBalance: number,
  energyBalance: number,
  likedCount: number,
  savedCount: number,
  worksCount: number,
  setInitialNetworkTab: (t: 'friends' | 'followers' | 'following') => void,
  setSelectedTopic: (t: Topic) => void,
  setCircleIsMyWorkMode: (b: boolean) => void,
  setCircleInitialTopicId: (id: string | undefined) => void
}) => {
  const lightCard = '';
  const [activeGallery, setActiveGallery] = useState<'works' | 'likes' | 'saved'>('works');
  const [isGrowthDialogOpen, setIsGrowthDialogOpen] = useState(false);
  const myStartedTopicIds = new Set(['1', '4', '6']);

  const getWorkBadge = (topic: Topic) => {
    if (topic.creator === CURRENT_USER.name || myStartedTopicIds.has(topic.id)) return '我发起的';
    if (topic.status !== 'completed') return '待成圈';
    return '参与共创';
  };

  const isPendingWork = (topic: Topic) => topic.status !== 'completed';

  const openWork = (topic: Topic) => {
    setSelectedTopic(topic);
    if (topic.status === 'completed') {
      setCircleIsMyWorkMode(true);
      setCircleInitialTopicId(topic.id);
      setScreen('circle');
      return;
    }
    setCircleIsMyWorkMode(false);
    setCircleInitialTopicId(undefined);
    setScreen('topic-detail');
  };

  const galleryWorks = [
    ...TOPICS.slice(0, 6).map((topic, index) => ({
      id: `topic-${topic.id}`,
      title: topic.title,
      image: topic.image || `https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=900&h=1200&fit=crop&sig=${index}`,
      metric: topic.likes,
      badge: getWorkBadge(topic),
      tone: topic.tone,
      targetScreen: topic.status === 'completed' ? 'circle' : 'topic-detail',
      topic,
    })),
  ];

  const likedWorks = TOPICS.slice(2, 8).map((topic, index) => ({
    id: `liked-${topic.id}`,
    title: topic.title,
    image: topic.image || `https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=900&h=1200&fit=crop&sig=${index + 12}`,
    metric: topic.likes,
    badge: getWorkBadge(topic),
    tone: topic.tone,
    targetScreen: 'topic-detail' as Screen,
    topic,
  }));

  const savedWorks = TOPICS.slice(4, 10).map((topic, index) => ({
    id: `saved-${topic.id}`,
    title: topic.title,
    image: topic.image || `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&h=1200&fit=crop&sig=${index + 24}`,
    metric: topic.bookmarks || topic.likes,
    badge: getWorkBadge(topic),
    tone: topic.tone,
    targetScreen: 'topic-detail' as Screen,
    topic,
  }));

  const activeWorks = activeGallery === 'works' ? galleryWorks : activeGallery === 'likes' ? likedWorks : savedWorks;

  return (
    <div className="flex flex-col h-full bg-[radial-gradient(circle_at_top,#fffaf4_0%,#f7f2ea_42%,#f2ebe1_100%)] pt-8 text-[#2f261d]">
      <header className="p-6 flex items-center justify-between sticky top-0 bg-[#f9f5ef]/90 backdrop-blur-xl z-20">
        <div className="w-10 h-10" />
        <h2 className="font-bold text-[#2f261d] text-lg tracking-tight">我的</h2>
        <button onClick={() => setScreen('settings')} className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/82 text-[#4f3d2d] shadow-sm active:scale-95 transition-transform">
          <Settings size={20} />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar px-4 pb-32">
        <section
          onClick={() => setScreen('personal-profile')}
          className={`${lightCard} mt-2 px-2 py-4 cursor-pointer group active:scale-[0.99] transition-all relative`}
        >
          <div className="absolute inset-x-12 top-0 h-20 bg-gradient-to-b from-[#f7e6c8]/50 to-transparent blur-3xl pointer-events-none"></div>
          <div className="relative flex items-center gap-4">
            <div className="relative shrink-0">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-[78px] h-[78px] rounded-full object-cover shadow-[0_10px_22px_rgba(73,55,39,0.12)]"
              />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2.5 py-1 flex items-center gap-1 rounded-full text-[11px] font-black text-[#b4834a] shadow-sm bg-[#fff6e9]">
                <Flame size={11} fill="currentColor" /> {CURRENT_USER.streak}
              </div>
            </div>

            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-start justify-between gap-3">
                <h1 className="min-w-0 text-[24px] font-black text-[#2f261d] tracking-tight leading-tight">{profile.name}</h1>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setScreen('personal-profile');
                  }}
                  aria-label="编辑个人资料"
                  className="mt-0.5 w-9 h-9 rounded-full bg-white/88 text-[#4f3d2d] shadow-sm flex items-center justify-center active:scale-95 transition-transform shrink-0"
                >
                  <Pencil size={16} />
                </button>
              </div>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                <p className="text-[#7d6f61]">@{profile.userId}</p>
                <span className="text-[11px] font-bold text-[#b0a08e]">IP：{profile.ipLocation}</span>
              </div>
              <p className="mt-2.5 text-[#8f7f6d] text-sm leading-relaxed">{profile.bio}</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 mt-6">
            <button onClick={(e) => { e.stopPropagation(); setInitialNetworkTab('friends'); setScreen('network-list'); }} className="text-center">
              <p className="text-[20px] font-black text-[#2f261d]">3</p>
              <p className="text-[10px] text-[#a79584] font-bold">好友</p>
            </button>
            <button onClick={(e) => { e.stopPropagation(); setInitialNetworkTab('following'); setScreen('network-list'); }} className="text-center">
              <p className="text-[20px] font-black text-[#2f261d]">{CURRENT_USER.following}</p>
              <p className="text-[10px] text-[#a79584] font-bold">关注</p>
            </button>
            <button onClick={(e) => { e.stopPropagation(); setInitialNetworkTab('followers'); setScreen('network-list'); }} className="text-center">
              <p className="text-[20px] font-black text-[#2f261d]">{CURRENT_USER.followers}</p>
              <p className="text-[10px] text-[#a79584] font-bold">粉丝</p>
            </button>
            <button onClick={(e) => { e.stopPropagation(); setScreen('energy-detail'); }} className="text-center">
              <p className="text-[20px] font-black text-[#2f261d]">1.2w</p>
              <p className="text-[10px] text-[#a79584] font-bold">获赞</p>
            </button>
          </div>

          <div className="mt-5 space-y-2.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setScreen('recharge');
              }}
              className="w-full rounded-[14px] bg-gradient-to-r from-[#eef3fb] via-white to-[#eef8f1] px-4 py-3 text-left shadow-sm active:scale-95 transition-transform"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#2f261d] shadow-sm shrink-0">
                  <Gem size={17} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-black text-[#8f7f6d] tracking-wide whitespace-nowrap">我的钻石</p>
                </div>
                <div className="ml-auto min-w-[88px] px-3 py-1.5 text-right">
                  <p className="text-[16px] font-black text-[#2f261d] leading-none">{diamondBalance.toLocaleString()}</p>
                </div>
              </div>
            </button>

            <div className="grid grid-cols-2 gap-2.5">
              {[
                { label: '智能戒指', value: '86', icon: ShieldCheck, action: () => setScreen('smart-ring'), tone: 'from-[#fff7eb] to-white' },
                { label: 'DR商城', value: energyBalance.toLocaleString(), icon: Star, action: () => setScreen('shop'), tone: 'from-[#fff1f4] to-white' },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={(e) => {
                    e.stopPropagation();
                    item.action();
                  }}
                  className={`rounded-[14px] bg-gradient-to-br ${item.tone} px-3.5 py-3 text-left shadow-sm active:scale-95 transition-transform min-h-[72px]`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#2f261d] shadow-sm shrink-0">
                      <item.icon size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-black text-[#8f7f6d] tracking-wide leading-tight">{item.label}</p>
                      <p className="mt-0.5 text-[17px] font-black text-[#2f261d] truncate">{item.value}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <button
          onClick={() => setIsGrowthDialogOpen(true)}
          className="mt-4 w-full rounded-[20px] bg-white/90 px-4 py-3 text-left shadow-[0_10px_28px_rgba(103,81,58,0.10)] active:scale-[0.99] transition-transform"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#2f261d] text-white">
              <ClipboardCheck size={22} strokeWidth={2.5} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-black leading-tight tracking-tight text-[#2f261d]">今日成长 2/3</h3>
              <p className="mt-0.5 truncate text-[12px] font-bold text-[#8f7f6d]">参与一个待成圈话题，可点亮今日记录</p>
            </div>
            <span className="shrink-0 rounded-full bg-[#FE2C55] px-5 py-3 text-sm font-black text-white shadow-[0_10px_22px_rgba(254,44,85,0.22)]">
              去完成
            </span>
          </div>
        </button>

        <section className="mt-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex bg-white/82 rounded-full p-1 shadow-sm">
              {[
                { id: 'works', label: '作品', count: 12 + worksCount },
                { id: 'likes', label: '喜欢', count: likedCount },
                { id: 'saved', label: '收藏', count: savedCount },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveGallery(tab.id as 'works' | 'likes' | 'saved')}
                  className={`px-4 py-2 rounded-full text-xs font-black transition-all ${
                    activeGallery === tab.id
                      ? 'bg-[#2f261d] text-white shadow-sm'
                      : 'text-[#8f7f6d]'
                  }`}
                >
                  {tab.label} {tab.count}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                if (activeGallery === 'works') setScreen('my-works');
                if (activeGallery === 'likes') setScreen('liked-topics');
                if (activeGallery === 'saved') setScreen('saved-topics');
              }}
              className="text-[11px] font-black text-[#8f7f6d] tracking-wide"
            >
              全部作品
            </button>
          </div>

          <div className="grid grid-cols-3 gap-1.5 mt-3">
            {activeWorks.map((work, index) => (
              <button
                key={work.id}
                onClick={() => {
                  openWork(work.topic);
                }}
                className="relative aspect-[3/4.4] overflow-hidden rounded-[16px] bg-[#f6ede3] group active:scale-[0.98] transition-transform"
              >
                <img
                  src={work.image}
                  alt={work.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-all ${
                    isPendingWork(work.topic) ? 'scale-105 blur-[6px]' : ''
                  }`}
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${isPendingWork(work.topic) ? 'from-black/75 via-black/30 to-black/5' : 'from-black/65 via-black/15 to-transparent'}`} />
                <div className="absolute left-2.5 top-2.5 px-2 py-1 rounded-full bg-white/90 text-[9px] font-black text-[#2f261d]">
                  {work.badge}
                </div>
                <div className="absolute bottom-0 inset-x-0 p-3 text-left">
                  <p className="text-[11px] font-black text-white/70 uppercase tracking-wide">
                    {work.badge}
                  </p>
                  <h4 className="mt-1 text-sm font-bold text-white leading-tight line-clamp-2">
                    {work.title}
                  </h4>
                  <div className="mt-2 flex items-center justify-between text-white/85">
                    <div className="flex items-center gap-1 text-[10px] font-black">
                      <Play size={10} className="fill-white stroke-none" />
                      <span>{work.metric}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-black">
                      <Heart size={10} className="fill-white/80 stroke-none" />
                      <span>{index + 12}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>

      <AnimatePresence>
        {isGrowthDialogOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsGrowthDialogOpen(false)}
            className="absolute inset-0 z-[120] bg-black/35 backdrop-blur-sm flex items-center justify-center p-5"
          >
            <motion.div
              initial={{ y: 28, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 28, opacity: 0, scale: 0.98 }}
              transition={{ type: 'spring', damping: 24, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[360px] rounded-[24px] bg-[#fffaf4] px-5 pt-5 pb-6 text-[#2f261d] shadow-[0_24px_70px_rgba(78,56,35,0.24)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#b4834a]">今日成长</p>
                  <h3 className="mt-1 text-2xl font-black tracking-tight">2/3 已完成</h3>
                  <p className="mt-1 text-[12px] font-bold text-[#8f7f6d]">参与一个待成圈话题，就能点亮今日记录。</p>
                </div>
                <button
                  onClick={() => setIsGrowthDialogOpen(false)}
                  className="w-9 h-9 rounded-full bg-white text-[#7b6b5c] shadow-sm flex items-center justify-center active:scale-95 transition-transform shrink-0"
                  aria-label="关闭"
                >
                  <X size={16} />
                </button>
              </div>

              <button
                onClick={() => setIsGrowthDialogOpen(false)}
                className="mt-5 w-full rounded-[18px] bg-white px-4 py-4 text-left shadow-sm active:scale-[0.99] transition-transform"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-black text-[#8f7f6d]">最接近成圈</p>
                    <p className="mt-1 text-sm font-black text-[#2f261d]">今天的城市声音</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-black text-[#b4834a]">6/8</p>
                    <p className="text-[9px] font-black text-[#aa9a86]">人数</p>
                  </div>
                </div>
                <div className="mt-4 h-2 rounded-full bg-[#ebe2d4] overflow-hidden">
                  <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-[#edbd79] to-[#ff2e67]" />
                </div>
              </button>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  { title: '浏览 3 个共创', done: '3/3', reward: '+20', primary: true },
                  { title: '回应一位好友', done: '0/1', reward: '+50' },
                  { title: '参与待成圈话题', done: '0/2', reward: '+100' },
                ].map((task, taskIndex) => (
                  <div
                    key={task.title}
                    className={`rounded-[16px] border px-3 py-3 text-left shadow-sm ${
                      task.primary ? 'border-[#ffbed0] bg-[#fff6f8]' : 'border-[#eadfce] bg-white'
                    }`}
                  >
                    <p className="min-h-[32px] text-[11px] font-black leading-snug text-[#4a3a2a]">{task.title}</p>
                    <div className="mt-3 flex items-center justify-between gap-1">
                      <span className={`text-[10px] font-black ${task.primary ? 'text-[#FE2C55]' : 'text-[#b4834a]'}`}>{task.done}</span>
                      <span className="inline-flex items-center whitespace-nowrap rounded-full bg-[#fff1d8] px-2 py-0.5 text-[9px] font-black leading-none text-[#b4834a]">⚡ {task.reward}</span>
                    </div>
                    <button
                      onClick={() => {
                        setIsGrowthDialogOpen(false);
                        if (taskIndex === 1) {
                          setScreen('messages');
                        } else if (taskIndex === 2) {
                          setScreen('home');
                        } else if (!task.primary) {
                          setScreen('circle');
                        }
                      }}
                      className={`mt-3 h-8 w-full rounded-full text-[10px] font-black active:scale-95 transition-transform ${
                        task.primary ? 'bg-[#FE2C55] text-white' : 'bg-[#2f261d] text-white'
                      }`}
                    >
                      {task.primary ? '领取' : '去完成'}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Messages Screen ---

const MessagesScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  const conversations = [
    { name: '系统通知', msg: '《下班后的三十分钟》已完成，可以查看成圈作品', time: '周一', unread: 0, tag: '官方' },
    { name: '迪儿7P2B6SG', msg: '我刚拍了一段 3 秒片段，顺手把声音也录进去了', time: '09:41', unread: 2, tag: '共创 12 次' },
    { name: '迪儿8JQB6SG', msg: '谢谢你给早餐桌送的礼物', time: '昨天', unread: 0, tag: '好友' },
    { name: '迪儿4K9B6SG', msg: '我还差一段夜景片段，等你一起补齐', time: '昨天', unread: 1, tag: '共创中' },
    { name: '迪儿9M2B6SG', msg: '这个主题我也想参与，先收藏了', time: '周二', unread: 0, tag: '' },
    { name: '迪儿3R8B6SG', msg: '上次那条成圈作品质感很好', time: '周一', unread: 0, tag: '共创 3 次' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#f7f7f7] pt-8 text-[#161616]">
      <header className="px-5 pt-4 pb-3 sticky top-0 bg-[#f7f7f7]/96 backdrop-blur-xl z-20">
        <div className="flex items-center justify-between">
          <h1 className="text-[26px] font-black text-[#161616] tracking-tight">消息</h1>
          <div className="w-9 h-9" />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-32">
         <div className="bg-white">
            {conversations.map((convo) => (
              <div
                key={convo.name}
                onClick={() => setScreen('dm')}
                className="flex items-center px-4 py-3 active:bg-[#f7f7f7] transition-colors cursor-pointer relative"
              >
                 <div className="relative">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${convo.name}`} alt="" className="w-[52px] h-[52px] rounded-full bg-[#f3f3f3] object-cover" />
                    {convo.unread > 0 && (
                       <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-[#FE2C55] rounded-full flex items-center justify-center border-2 border-white">
                          <span className="text-[10px] font-black text-white">{convo.unread}</span>
                       </div>
                    )}
                 </div>
                 <div className="ml-3 flex-1 min-w-0 py-1">
                    <div className="flex justify-between items-center gap-3">
                       <div className="flex items-center gap-2 min-w-0">
                         <h4 className="text-[16px] font-black text-[#161616] truncate">{convo.name}</h4>
                         {convo.tag && (
                           <span className="shrink-0 rounded-full bg-[#f4f4f4] px-2 py-0.5 text-[9px] font-black text-[#8b8b8b]">{convo.tag}</span>
                         )}
                       </div>
                       <span className="shrink-0 text-[11px] text-[#a6a6a6]">{convo.time}</span>
                    </div>
                    <p className="text-[14px] text-[#8f8f8f] truncate mt-1.5">{convo.msg}</p>
                 </div>
              </div>
            ))}
         </div>
      </main>
    </div>
  );
};

// --- Friends Screen ---

const FriendsScreen = ({ setScreen, setSelectedUserName, initialTab = 'friends' }: { setScreen: (s: Screen) => void, setSelectedUserName: (name: string) => void, initialTab?: 'friends' | 'followers' | 'following' }) => {
  const [activeTab, setActiveTab] = useState<'friends' | 'followers' | 'following'>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');

  const users = [
    { id: '1', name: '林野', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop', bio: '记录生活的碎片', isFollowing: true, followsMe: true },
    { id: '2', name: 'Mia', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop', bio: 'Stay curious.', isFollowing: true, followsMe: true },
    { id: '3', name: '周屿', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=128&h=128&fit=crop', bio: '捕风者', isFollowing: false, followsMe: true },
    { id: '4', name: '张震', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&fit=crop', bio: '光影记录家', isFollowing: true, followsMe: false },
    { id: '5', name: '苏苏', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop', bio: '正在努力共创中', isFollowing: true, followsMe: true },
    { id: '6', name: 'Echo', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Echo', bio: '灵感捕捉机', isFollowing: false, followsMe: true },
  ];

  const filteredByTab = users.filter(u => {
    if (activeTab === 'friends') return u.isFollowing && u.followsMe;
    if (activeTab === 'following') return u.isFollowing;
    if (activeTab === 'followers') return u.followsMe;
    return true;
  });

  const filteredUsers = filteredByTab.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const renderUserList = (userList: typeof users) => (
    <div className="divide-y divide-white/[0.03]">
      {userList.map(user => (
        <div
          key={user.id}
          onClick={() => {
              setSelectedUserName(user.name);
              setScreen('user-profile');
          }}
          className="flex items-center px-6 py-4 active:bg-white/[0.02] transition-all cursor-pointer"
        >
          <img src={user.avatar} alt="" className="w-12 h-12 rounded-xl bg-white/10 border border-white/5 object-cover" />
          <div className="ml-4 flex-1">
              <p className="text-[17px] font-bold text-white">{user.name}</p>
              <p className="text-xs text-white/30 truncate mt-0.5">{user.bio}</p>
          </div>
          <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedUserName(user.name);
                setScreen('dm');
              }}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase border border-white/5 rounded-lg transition-all"
          >
            私信
          </button>
        </div>
      ))}
      {userList.length === 0 && (
        <div className="py-20 text-center opacity-40">
          <p className="text-xs font-black uppercase tracking-widest">暂无相关人员</p>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    if (activeTab === 'friends') {
      return (
        <>
          <div className="px-6 mb-6">
            <div className="p-6 bg-gradient-to-br from-[#eef8f1] to-[#fffaf5] rounded-[24px] border border-[#d8eadf] space-y-3 shadow-[0_18px_40px_rgba(103,81,58,0.06)]">
              <p className="text-xs font-black uppercase text-emerald-500 tracking-widest">好友定义</p>
              <h3 className="text-xl font-bold leading-tight text-[#2f261d]">互相关注的人，就是好友。</h3>
              <p className="text-[#8f7f6d] text-xs leading-relaxed">好友可直接发起私信，也可以在共创召集中作为第一顺位被邀请。</p>
            </div>
          </div>
          {renderUserList(filteredUsers)}
        </>
      );
    }
    return renderUserList(filteredUsers);
  };


  return (
    <div className={lightPageRootPadded}>
      <header className={lightHeaderShell}>
        <button onClick={() => setScreen('me')} className={lightIconButton}>
          <ArrowLeft size={20} />
        </button>
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('friends')}
            className={`font-bold transition-colors ${activeTab === 'friends' ? 'text-[#2f261d]' : 'text-[#b0a08e]'}`}
          >
            好友
          </button>
          <button
            onClick={() => setActiveTab('following')}
            className={`font-bold transition-colors ${activeTab === 'following' ? 'text-[#2f261d]' : 'text-[#b0a08e]'}`}
          >
            关注
          </button>
          <button
            onClick={() => setActiveTab('followers')}
            className={`font-bold transition-colors ${activeTab === 'followers' ? 'text-[#2f261d]' : 'text-[#b0a08e]'}`}
          >
            粉丝
          </button>
        </div>
        <div className="w-10 h-10"></div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-12">
        {renderContent()}
      </main>
    </div>
  );
};

// --- Settings Screen ---

const SettingsScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  return (
    <div className={`${lightPageRootPadded} overflow-y-auto no-scrollbar pb-10`}>
      <header className={lightHeaderShell}>
        <button onClick={() => setScreen('me')} className={lightIconButton}>
          <ArrowLeft size={20} />
        </button>
        <h2 className="font-bold text-[#2f261d]">系统设置</h2>
        <div className="w-10 h-10"></div>
      </header>

      <main className="flex-1 px-6 space-y-4">
        { [
          { icon: UserIcon, label: '账号资料', desc: '昵称、头像、简介', screen: 'account-profile' },
          { icon: ShieldCheck, label: '隐私政策', desc: '关注、作品、私信权限', screen: 'privacy-policy' },
          { icon: Bell, label: '通知设置', desc: '成圈、关注、评论提醒', screen: 'notification-settings' },
          { icon: Lock, label: '黑名单列表', desc: '管理已拉黑的账号', screen: 'blacklist' },
          { icon: MessageSquare, label: '用户反馈', desc: '在使用中遇到问题或建议', screen: 'feedback' },
        ].map(item => (
          <div
            key={item.label}
            onClick={() => setScreen(item.screen as any)}
            className={`p-4 flex items-center gap-4 active:bg-[#faf4ec] transition-colors cursor-pointer ${lightSurfaceCard}`}
          >
             <div className="w-10 h-10 rounded-lg flex items-center justify-center text-[#8f7f6d] bg-[#f6ede3] border border-[#eadfce]">
                <item.icon size={20} />
             </div>
             <div className="flex-1">
                <p className="text-sm font-bold text-[#2f261d]">{item.label}</p>
                <p className="text-[10px] text-[#8f7f6d] font-black uppercase tracking-widest mt-0.5">{item.desc}</p>
             </div>
             <ChevronRight size={16} className="text-[#c0b09d]" />
          </div>
        ))}

        <div className="pt-8">
           <button onClick={() => setScreen('login')} className="w-full h-14 rounded-xl text-rose-500 font-bold text-sm active:scale-95 transition-transform uppercase tracking-widest border border-rose-200 bg-white/82 shadow-sm">
              退出当前账号
           </button>
        </div>
      </main>
    </div>
  );
};

const BlacklistScreen = ({ setScreen, blockedUserNames, unblockUser }: {
  setScreen: (s: Screen) => void,
  blockedUserNames: string[],
  unblockUser: (name: string) => void,
}) => {
  return (
    <div className={lightPageRootPadded}>
      <header className={lightHeaderShell}>
        <button onClick={() => setScreen('settings')} className={lightIconButton}>
          <ArrowLeft size={20} />
        </button>
        <h2 className="font-bold text-[#2f261d] text-lg tracking-tight">黑名单列表</h2>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar px-6 py-4">
        {blockedUserNames.length > 0 ? (
          <div className="space-y-3">
            {blockedUserNames.map((name) => (
              <div key={name} className={`flex items-center gap-3 p-4 rounded-[18px] ${lightSurfaceCard}`}>
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} alt="" className="h-12 w-12 rounded-xl bg-[#f6ede3] object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="font-black text-[#2f261d]">{name}</p>
                  <p className="mt-0.5 text-[10px] font-black uppercase tracking-widest text-[#a79584]">已限制互动与私信</p>
                </div>
                <button
                  onClick={() => unblockUser(name)}
                  className="h-9 rounded-full border border-[#eadfce] bg-white px-4 text-[11px] font-black text-[#2f261d] active:scale-95 transition-transform"
                >
                  解除
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-[18px] bg-white/72 text-[#c0b09d] shadow-sm">
              <Lock size={26} />
            </div>
            <p className="font-black text-[#2f261d]">暂无黑名单账号</p>
            <p className="mt-2 max-w-[220px] text-xs font-bold leading-relaxed text-[#8f7f6d]">
              被拉黑的人会出现在这里，你可以随时解除限制。
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

const REPORT_REASONS = [
  '发布不当的内容或信息',
  '传播色情资源、引导私下交易',
  '侵犯权益',
  '未成年相关',
  '冒充他人',
  '涉嫌欺诈',
  '危害人身安全',
  '网络暴力',
  '我不喜欢这个账号及内容',
];

const VIDEO_REPORT_REASONS = [
  '我不喜欢',
  '侵犯权益',
  '色情低俗',
  '违法犯罪',
  '政治敏感',
  '违规营销',
  '不实信息',
  '网络暴力',
  '危害人身安全',
  '未成年相关',
];

const ReportUserScreen = ({ setScreen, targetName, reportType, showToast }: {
  setScreen: (s: Screen) => void,
  targetName: string,
  reportType: 'account' | 'video',
  showToast: (m: string) => void,
}) => {
  const [reason, setReason] = useState('');
  const isVideoReport = reportType === 'video';
  const reasons = isVideoReport ? VIDEO_REPORT_REASONS : REPORT_REASONS;

  return (
    <div className="flex h-full flex-col bg-[#f3f6fc] pt-8 text-[#161616]">
      <header className="flex items-center justify-between px-5 py-4">
        <button onClick={() => setScreen(isVideoReport ? 'home' : 'user-profile')} className="flex h-10 w-10 items-center justify-center rounded-xl text-[#161616] active:scale-95 transition-transform">
          <ArrowLeft size={24} strokeWidth={2.5} />
        </button>
        <h2 className="text-lg font-black">{isVideoReport ? '话题举报' : '账号举报'}</h2>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar px-4 pb-4">
        <div className="mb-4 px-2 text-xs font-bold text-[#7d8795]">举报对象：{targetName}</div>
        <div className="overflow-hidden rounded-[16px] bg-white shadow-sm">
          {reasons.map((item, index) => (
            <button
              key={item}
              onClick={() => setReason(item)}
              className={`flex w-full items-center justify-between px-5 py-5 text-left active:bg-[#f7f8fb] transition-colors ${
                index === reasons.length - 1 ? '' : 'border-b border-[#edf0f5]'
              }`}
            >
              <span className="pr-4 text-[17px] font-medium leading-snug text-[#222]">{item}</span>
              <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                reason === item ? 'border-[#6f91f5] bg-[#6f91f5]' : 'border-[#b8bdc5]'
              }`}>
                {reason === item && <Check size={12} className="text-white" strokeWidth={4} />}
              </span>
            </button>
          ))}
        </div>
      </main>

      <div className="px-4 pb-8 pt-3">
        <button
          disabled={!reason}
          onClick={() => {
            showToast('举报已提交');
            setScreen('report-success');
          }}
          className="h-14 w-full rounded-xl bg-[#2f261d] text-lg font-black text-white shadow-[0_14px_28px_rgba(47,38,29,0.16)] transition-transform active:scale-95 disabled:bg-[#d8cbbb] disabled:text-white/80 disabled:shadow-none"
        >
          下一步
        </button>
      </div>
    </div>
  );
};

const ReportSuccessScreen = ({ setScreen, targetName }: {
  setScreen: (s: Screen) => void,
  targetName: string,
}) => {
  return (
    <div className={lightPageRootPadded}>
      <main className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#eaf7ef] text-emerald-500 shadow-sm">
          <Check size={36} strokeWidth={3.5} />
        </div>
        <h1 className="text-2xl font-black text-[#2f261d]">举报已提交</h1>
        <p className="mt-3 text-sm font-bold leading-relaxed text-[#8f7f6d]">
          我们会尽快核查 {targetName} 的相关内容，并在必要时采取处理措施。
        </p>
      </main>
      <div className="px-6 pb-10">
        <button
          onClick={() => setScreen('home')}
          className="h-14 w-full rounded-xl bg-[#2f261d] text-sm font-black text-white shadow-[0_14px_28px_rgba(47,38,29,0.14)] active:scale-95 transition-transform"
        >
          完成
        </button>
      </div>
    </div>
  );
};

const AccountProfileScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  return (
    <div className={lightPageRootPadded}>
      <header className={lightHeaderShell}>
        <button onClick={() => setScreen('settings')} className={lightIconButton}>
          <ArrowLeft size={20} />
        </button>
        <h2 className="font-bold text-[#2f261d] text-lg tracking-tight">帐号资料</h2>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar px-6 py-4">
        <div className="flex flex-col items-center mt-6 mb-8">
          <div className="w-24 h-24 rounded-[24px] bg-white/82 flex items-center justify-center border-4 border-white relative shadow-lg">
            <UserIcon size={40} className="text-[#c8b8a7]" />
            <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#FE2C55] flex items-center justify-center border-2 border-white active:scale-95 transition-transform shadow-lg">
              <Camera size={14} className="text-white" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-[#b0a08e] uppercase tracking-widest pl-4">昵称</label>
            <div className={`w-full px-4 py-4 rounded-2xl text-[#2f261d] font-bold flex justify-between items-center ${lightSurfaceCard}`}>
              <span>{CURRENT_USER.name}</span>
              <ChevronRight size={16} className="text-[#c0b09d]" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-[#b0a08e] uppercase tracking-widest pl-4">简介</label>
            <div className={`w-full px-4 py-4 rounded-2xl text-[#2f261d] font-bold flex justify-between items-center ${lightSurfaceCard}`}>
              <span className="text-[#8f7f6d] text-sm truncate">添加简介，让大家更好认识你</span>
              <ChevronRight size={16} className="text-[#c0b09d]" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-[#b0a08e] uppercase tracking-widest pl-4">性别</label>
            <div className={`w-full px-4 py-4 rounded-2xl text-[#2f261d] font-bold flex justify-between items-center ${lightSurfaceCard}`}>
              <span className="text-[#8f7f6d] text-sm">不公开</span>
              <ChevronRight size={16} className="text-[#c0b09d]" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const PrivacyPolicyScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  return (
    <div className={lightPageRootPadded}>
      <header className={lightHeaderShell}>
        <button onClick={() => setScreen('settings')} className={lightIconButton}>
          <ArrowLeft size={20} />
        </button>
        <h2 className="font-bold text-[#2f261d] text-lg tracking-tight">隐私政策</h2>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar px-6 py-6 space-y-6 text-[#6f6256] text-sm leading-relaxed">
        <h3 className="text-xl font-bold text-[#2f261d]">Dream Record 隐私保护指引</h3>
        <p>本指引旨在帮助你了解我们如何收集、使用、存储及分享你的个人信息，以及你如何管理这些信息。</p>

        <h4 className="font-bold text-[#2f261d] text-base">1. 我们收集的信息</h4>
        <p>当你使用本应用时，为了提供基本服务，我们可能会收集你的设备信息、网络信息、使用日志等数据。</p>

        <h4 className="font-bold text-[#2f261d] text-base">2. 信息的存储</h4>
        <p>我们承诺将你的信息存储在安全可靠的环境中，采用加密等技术措施保护数据安全。</p>

        <h4 className="font-bold text-[#2f261d] text-base">3. 信息的使用</h4>
        <p>收集的信息将专门用于持续优化产品体验、为你推荐个性化内容等，绝不出售给任何第三方。</p>

        <h4 className="font-bold text-[#2f261d] text-base">4. 你的权利</h4>
        <p>你有权随时查询、更正或要求删除你的个人信息，也可以在账号设置中管理各类隐私权限选项。</p>
      </main>
    </div>
  );
};

const NotificationSettingsScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  return (
    <div className={lightPageRootPadded}>
      <header className={lightHeaderShell}>
        <button onClick={() => setScreen('settings')} className={lightIconButton}>
          <ArrowLeft size={20} />
        </button>
        <h2 className="font-bold text-[#2f261d] text-lg tracking-tight">通知设置</h2>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar px-6 py-4">
        <div className="space-y-4">
          <div className={`flex items-center justify-between p-5 rounded-2xl ${lightSurfaceCard}`}>
            <div>
              <p className="text-base font-bold text-[#2f261d] mb-0.5">消息通知</p>
              <p className="text-[10px] text-[#8f7f6d]">接收私信、群聊等即时消息</p>
            </div>
            <div className="w-12 h-6 rounded-full bg-[#FE2C55] flex items-center px-1">
              <div className="w-4 h-4 rounded-full bg-white translate-x-6" />
            </div>
          </div>

          <div className={`flex items-center justify-between p-5 rounded-2xl ${lightSurfaceCard}`}>
            <div>
              <p className="text-base font-bold text-[#2f261d] mb-0.5">互动通知</p>
              <p className="text-[10px] text-[#8f7f6d]">有点赞、评论、关注时提醒我</p>
            </div>
            <div className="w-12 h-6 rounded-full bg-[#eadfce] flex items-center px-1">
              <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
            </div>
          </div>

          <div className={`flex items-center justify-between p-5 rounded-2xl ${lightSurfaceCard}`}>
            <div>
              <p className="text-base font-bold text-[#2f261d] mb-0.5">系统公告</p>
              <p className="text-[10px] text-[#8f7f6d]">接收应用更新与重要活动通知</p>
            </div>
            <div className="w-12 h-6 rounded-full bg-[#FE2C55] flex items-center px-1">
              <div className="w-4 h-4 rounded-full bg-white translate-x-6" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- Saved Topics Screen ---

const TopicCollectionScreen = ({ setScreen, topicsList, setSelectedTopic, topicIds, title, emptyText, emptyIcon }: {
  setScreen: (s: Screen) => void,
  topicsList: Topic[],
  setSelectedTopic: (t: Topic) => void,
  topicIds: Set<string>,
  title: string,
  emptyText: string,
  emptyIcon: React.ReactNode
}) => {
  const topics = topicsList.filter(t => topicIds.has(t.id));

  return (
    <div className={lightPageRootPadded}>
      <header className={lightHeaderShell}>
        <button onClick={() => setScreen('me')} className={lightIconButton}>
          <ArrowLeft size={20} />
        </button>
        <h2 className="font-bold text-[#2f261d]">{title}</h2>
        <div className="w-10 h-10"></div>
      </header>

      <main className="flex-1 p-6 overflow-y-auto no-scrollbar pb-6">
        {topics.length === 0 ? (
          <div className="py-20 text-center space-y-4">
             <div className="w-16 h-16 bg-white/82 rounded-full flex items-center justify-center mx-auto text-[#d7c6b2] border border-[#eadfce]">
                {emptyIcon}
             </div>
             <p className="text-[#b0a08e] font-black uppercase text-xs tracking-widest">{emptyText}</p>
          </div>
        ) : (
          <div className="columns-2 gap-4 space-y-4">
             {topics.map((topic, i) => (
                <motion.div
                  key={`${topic.id}-${i}`}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    setSelectedTopic(topic);
                    setScreen('topic-detail');
                  }}
                  className={`break-inside-avoid p-4 space-y-3 shadow-lg cursor-pointer ${lightSurfaceCard}`}
                >
                   <div className={`aspect-[3/4] rounded-xl bg-gradient-to-br relative overflow-hidden ${
                     topic.tone === 'amber' ? 'from-[#fff2df] to-[#f6ede3]' :
                     topic.tone === 'green' ? 'from-[#eef8f1] to-[#f6ede3]' : 'from-[#eef3fb] to-[#f6ede3]'
                   }`}>
                      <div className="absolute inset-0 flex items-center justify-center opacity-15">
                        <Users size={48} className="text-[#bcae9d]" />
                      </div>
                      {topic.status === 'completed' ? (
                        <div className="absolute top-2 right-2 bg-emerald-100 px-2 py-0.5 rounded text-[8px] font-black uppercase text-emerald-600">
                          {topic.joinedCount}人共创
                        </div>
                      ) : (
                        <div className="absolute top-2 right-2 bg-[#fff1dc] px-2 py-0.5 rounded text-[8px] font-black uppercase text-[#b4834a]">
                          待成圈
                        </div>
                      )}
                   </div>
                   <div className="space-y-1">
                     <h4 className="text-sm font-bold line-clamp-2 leading-tight text-[#2f261d]">{topic.title}</h4>
                     {topic.status !== 'completed' && (
                       <p className="text-[9px] font-black text-[#b4834a] uppercase tracking-tight">
                         还需 {topic.targetCount - topic.joinedCount} 人成圈
                       </p>
                     )}
                     <div className="flex items-center justify-between pt-1">
                         <div
                           className="flex items-center gap-1 cursor-pointer"
                           onClick={(e) => {
                             e.stopPropagation();
                           }}
                         >
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${topic.creator}`} alt="" className="w-4 h-4 rounded-full bg-[#f1e8dc] object-cover" />
                            <span className="text-[10px] text-[#8f7f6d]">@{topic.creator}</span>
                         </div>
                        {topic.status === 'completed' ? (
                          <div className="flex items-center gap-1 text-[10px] text-[#8f7f6d]">
                            <Heart size={10} className="fill-gold stroke-none" /> {topic.likes}
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-[10px] text-[#b4834a] font-black italic">
                            <Users size={10} className="fill-gold stroke-none" /> {topic.joinedCount}/{topic.targetCount}
                          </div>
                        )}
                     </div>
                   </div>
                </motion.div>
             ))}
          </div>
        )}
      </main>

      <footer className="p-6 pt-0 bg-dark/80 backdrop-blur-md border-t border-white/[0.03]">
         <button onClick={() => setScreen('home')} className="w-full h-14 bg-white text-dark rounded-[18px] font-black uppercase text-xs shadow-2xl active:scale-95 transition-transform flex items-center justify-center">
            去发现更多
         </button>
      </footer>
    </div>
  );
};

const LikedTopicsScreen = ({ setScreen, topics, likedTopicIds, setSelectedTopic }: {
  setScreen: (s: Screen) => void,
  topics: Topic[],
  likedTopicIds: Set<string>,
  setSelectedTopic: (t: Topic) => void
}) => (
  <TopicCollectionScreen
    setScreen={setScreen}
    topicsList={topics}
    setSelectedTopic={setSelectedTopic}
    topicIds={likedTopicIds}
    title="我的喜欢"
    emptyText="还没有喜欢过任何作品哦"
    emptyIcon={<Heart size={32} />}
  />
);

const SavedTopicsScreen = ({ setScreen, topics, savedTopicIds, setSelectedTopic }: {
  setScreen: (s: Screen) => void,
  topics: Topic[],
  savedTopicIds: Set<string>,
  setSelectedTopic: (t: Topic) => void
}) => (
  <TopicCollectionScreen
    setScreen={setScreen}
    topicsList={topics}
    setSelectedTopic={setSelectedTopic}
    topicIds={savedTopicIds}
    title="我的收藏"
    emptyText="还没有收藏过任何作品哦"
    emptyIcon={<Bookmark size={32} />}
  />
);

// --- My Works Screen ---

const MyWorksScreen = ({ setScreen, topics, setSelectedTopic, userVlogs, setCircleIsMyWorkMode, setCircleInitialTopicId }: {
  setScreen: (s: Screen) => void,
  topics: Topic[],
  setSelectedTopic: (t: Topic) => void,
  userVlogs: UserVlog[],
  setCircleIsMyWorkMode: (b: boolean) => void,
  setCircleInitialTopicId: (id: string | undefined) => void
}) => {
  const [filter, setFilter] = useState('全部');
  const [isVisibilityDrawerOpen, setIsVisibilityDrawerOpen] = useState(false);
  const [editingWorkId, setEditingWorkId] = useState<string | null>(null);
  const [workVisibilities, setWorkVisibilities] = useState<Record<string, Visibility>>({});
  const [selectedFriendIds, setSelectedFriendIds] = useState<Set<string>>(new Set());

  const filterOptions = ['全部', '我发起的', '参与共创', '待成圈'];

  const staticWorks = [
    { id: 'sw-1', type: '发起', status: '已成圈', title: '今天的城市声音', likes: '8.2k' },
    { id: 'sw-2', type: '参与', status: '已成圈', title: '今天真实的早餐桌', likes: '12.8k' },
    { id: 'sw-3', type: '参与', status: '待成圈', title: '下班后的三十分钟', likes: '5.4k' },
    { id: 'sw-4', type: '发起', status: '待成圈', title: '深夜的一盏灯', likes: '2.9k' },
    { id: 'sw-5', type: '参与', status: '已成圈', title: '早高峰的地铁窗', likes: '3.6k' },
    { id: 'sw-6', type: '发起', status: '已成圈', title: '周末的桌面', likes: '4.1k' },
  ];

  const allWorks = [...userVlogs, ...staticWorks];

  const getDisplayStatus = (work: { type: string; status: string }) => {
    if (work.type === '发起') return '我发起的';
    if (work.status === '待成圈') return '待成圈';
    return '参与共创';
  };

  const filteredWorks = allWorks.filter((work) => {
    if (filter === '全部') return true;
    if (filter === '我发起的') return work.type === '发起';
    if (filter === '参与共创') return work.type === '参与' && work.status === '已成圈';
    if (filter === '待成圈') return work.status === '待成圈';
    return true;
  });

  const getVisibility = (id: string) => workVisibilities[id] || 'public';

  const handleSetVisibility = (v: Visibility) => {
    if (editingWorkId) {
      setWorkVisibilities(prev => ({ ...prev, [editingWorkId]: v }));
    }
  };

  return (
    <div className="flex flex-col h-full bg-[radial-gradient(circle_at_top,#fffaf4_0%,#f7f2ea_42%,#f2ebe1_100%)] text-[#2f261d]">
      <header className="p-6 flex items-center justify-between z-20 sticky top-0 bg-[#f9f5ef]/90 backdrop-blur-xl border-b border-[#e8dfd2]">
        <button onClick={() => setScreen('me')} className="w-10 h-10 rounded-xl flex items-center justify-center border border-[#e9dfd3] bg-white/82 text-[#4f3d2d] shadow-sm active:scale-95 transition-transform">
          <ArrowLeft size={20} />
        </button>
        <h2 className="font-bold text-[#2f261d] text-lg tracking-tight">全部作品</h2>
        <div className="w-10 h-10" />
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-32">
        <section className="px-5 pt-5 space-y-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {filterOptions.map(opt => (
              <button
                key={opt}
                onClick={() => setFilter(opt)}
                className={`px-4 py-2 rounded-full text-[10px] font-black transition-all whitespace-nowrap border ${
                  filter === opt ? 'bg-[#2f261d] text-white border-[#2f261d] shadow-sm' : 'bg-white/82 text-[#8f7f6d] border-[#eadfce]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2.5 mt-2">
              {filteredWorks.map((work, i) => {
                const topic = topics.find(t => t.id === (work as any).topicId) || topics[i % topics.length];
                const visibility = getVisibility(work.id);
                const isPending = work.status !== '已成圈';

                return (
                  <motion.div
                    key={work.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => {
                      setSelectedTopic(topic);
                      if (work.status === '已成圈') {
                        setCircleIsMyWorkMode(true);
                        setCircleInitialTopicId(topic.id);
                        setScreen('circle');
                      } else {
                        setScreen('topic-detail');
                      }
                    }}
                    className="aspect-[3/4.1] rounded-[18px] bg-[#f6ede3] border border-[#eadfce] relative overflow-hidden group cursor-pointer shadow-[0_14px_28px_rgba(103,81,58,0.08)] active:scale-[0.98] transition-transform"
                  >
                  {topic.image ? (
                    <img
                      src={topic.image}
                      alt={work.title}
                      className={`absolute inset-0 h-full w-full object-cover transition-all ${isPending ? 'scale-105 blur-[6px]' : ''}`}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#eef3fb] via-[#fffaf4] to-[#eef8f1]" />
                  )}
                  <div className={`absolute inset-0 bg-gradient-to-t ${isPending ? 'from-black/75 via-black/30 to-black/5' : 'from-black/65 via-black/15 to-transparent'}`} />

                  <div className="absolute top-2 right-2 z-10 flex gap-1">
                     <button
                       onClick={(e) => {
                         e.stopPropagation();
                         setEditingWorkId(work.id);
                         setIsVisibilityDrawerOpen(true);
                       }}
                       className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md border border-white/70 flex items-center justify-center text-[#4f3d2d] active:scale-90 transition-all shadow-sm"
                     >
                       {visibility === 'public' && <Globe size={14} />}
                       {visibility === 'friends' && <Users2 size={14} />}
                       {visibility === 'private' && <Lock size={14} />}
                       {visibility === 'selected' && <UserIcon size={14} />}
                     </button>
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-end p-3">
                    <span className="absolute left-2.5 top-2.5 rounded-full bg-white/90 px-2 py-1 text-[9px] font-black text-[#2f261d] shadow-sm">
                      {getDisplayStatus(work)}
                    </span>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${work.type === '发起' ? 'bg-[#FE2C55]' : work.status === '已成圈' ? 'bg-green-400' : 'bg-gold'}`}></span>
                        <span className="text-[9px] font-black text-white/70">{getDisplayStatus(work)}</span>
                      </div>
                      <p className="text-[10px] font-bold text-white/70">{work.likes}</p>
                    </div>
                    <p className="text-sm text-white font-black mt-1 leading-tight line-clamp-2">{work.title}</p>
                  </div>
                </motion.div>
              );
            })}
            {filteredWorks.length === 0 && (
              <div className="col-span-2 py-20 text-center">
                <p className="text-[#b0a08e] text-xs font-black uppercase tracking-widest">暂无相关作品</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <VisibilitySelectorDrawer
        isOpen={isVisibilityDrawerOpen}
        onClose={() => setIsVisibilityDrawerOpen(false)}
        visibility={editingWorkId ? getVisibility(editingWorkId) : 'public'}
        setVisibility={handleSetVisibility}
        selectedFriendIds={selectedFriendIds}
        setSelectedFriendIds={setSelectedFriendIds}
      />
    </div>
  );
};

// --- Create Circle Screen ---

const CreateCircleScreen = ({ setScreen, setSelectedTopic, initialTopicInfo }: { setScreen: (s: Screen) => void, setSelectedTopic: (t: Topic) => void, initialTopicInfo?: Partial<Topic> }) => {
  const [participants, setParticipants] = useState(initialTopicInfo?.targetCount || 8);
  const [duration, setDuration] = useState(initialTopicInfo?.durationLimit || 5);
  const [visibility, setVisibility] = useState<'public' | 'friends' | 'private' | 'selected'>('public');
  const [showSelector, setShowSelector] = useState(false);
  const [selectedFriendIds, setSelectedFriendIds] = useState<Set<string>>(new Set());
  const [topicTitle, setTopicTitle] = useState(initialTopicInfo?.title || '');
  const [topicDescription, setTopicDescription] = useState(initialTopicInfo?.description || '');

  const friends = [
    { id: '1', name: '林野', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop' },
    { id: '2', name: 'Mia', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop' },
    { id: '3', name: '周屿', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=128&h=128&fit=crop' },
    { id: '4', name: '张震', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&fit=crop' },
    { id: '5', name: '苏苏', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop' },
  ];

  const toggleFriend = (id: string) => {
    const next = new Set(selectedFriendIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedFriendIds(next);
  };

  const selectedFriendNames = friends
    .filter(f => selectedFriendIds.has(f.id))
    .map(f => f.name)
    .join('、');

  return (
    <div className={`${lightPageRootPadded} relative overflow-hidden`}>
      <header className={lightHeaderShell}>
        <button onClick={() => setScreen('home')} className={lightIconButton}>
          <ArrowLeft size={20} />
        </button>
        <h2 className="font-bold text-[#2f261d]">发起共创</h2>
        <div className="w-10 h-10"></div>
      </header>

      <main className="flex-1 p-6 space-y-8 overflow-y-auto no-scrollbar pb-10">
        <div className="space-y-4">
          <input
            className={`w-full h-14 rounded-xl px-5 font-bold outline-none focus:border-[#FE2C55]/25 ${lightInputField}`}
            placeholder="你需要大家做什么"
            value={topicTitle}
            onChange={(e) => setTopicTitle(e.target.value)}
          />
          <textarea
            className={`w-full rounded-xl p-5 font-medium outline-none focus:border-[#FE2C55]/25 text-sm min-h-[120px] resize-none ${lightInputField}`}
            placeholder="添加话题描述，让更多人加入共创..."
            value={topicDescription}
            onChange={(e) => setTopicDescription(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase text-[#b19f8d] tracking-widest ml-1">参与人数（2-12）</label>
          <div className="grid grid-cols-4 gap-2">
            {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
              <button
                key={num}
                onClick={() => setParticipants(num)}
                className={`h-12 rounded-xl font-black text-xs transition-all ${participants === num ? 'bg-[#FE2C55] text-white shadow-[0_12px_24px_rgba(254,44,85,0.18)]' : 'bg-white/82 text-[#8f7f6d] border border-[#eadfce]'}`}
              >
                {num} 人
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase text-[#b19f8d] tracking-widest ml-1">作品时间限制 (3-10秒)</label>
          <div className="flex items-center gap-4 p-4 rounded-xl border border-[#eadfce] bg-white/82 shadow-sm">
             <span className="text-sm font-bold text-[#2f261d] w-8">{duration}s</span>
             <input
               type="range"
               min="3"
               max="10"
               value={duration}
               onChange={(e) => setDuration(parseInt(e.target.value))}
               className="flex-1 h-1 rounded-full appearance-none cursor-pointer accent-[#FE2C55] bg-[#eadfce]"
             />
             <div className="flex gap-1">
                {[3, 5, 8, 10].map(v => (
                  <button
                    key={v}
                    onClick={() => setDuration(v)}
                    className={`px-2 py-1 rounded-lg text-[8px] font-black tracking-tighter ${duration === v ? 'bg-[#FE2C55] text-white' : 'bg-[#f6ede3] text-[#8f7f6d]'}`}
                  >
                    {v}S
                  </button>
                ))}
             </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase text-[#b19f8d] tracking-widest ml-1">可见范围</label>
          <div
            onClick={() => setShowSelector(true)}
            className={`p-6 flex items-center justify-between active:bg-[#fbf6ef] transition-all group ${lightSurfaceCard}`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#f6ede3] flex items-center justify-center text-[#8f7f6d] group-active:text-[#FE2C55] transition-colors">
                {visibility === 'public' && <Globe size={20} />}
                {visibility === 'friends' && <Users2 size={20} />}
                {visibility === 'private' && <Lock size={20} />}
                {visibility === 'selected' && <UserIcon size={20} />}
              </div>
              <div>
                <p className="text-sm font-black text-[#2f261d] tracking-wide">谁可以看</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-[10px] text-[#b4834a] font-bold uppercase tracking-widest">
                    {visibility === 'public' && '公开'}
                    {visibility === 'friends' && '朋友'}
                    {visibility === 'private' && '私密'}
                    {visibility === 'selected' && '部分可见'}
                  </p>
                  {visibility === 'selected' && selectedFriendIds.size > 0 && (
                    <span className="text-[9px] text-[#aa9a86] font-medium">({selectedFriendNames.length > 15 ? selectedFriendNames.slice(0, 15) + '...' : selectedFriendNames})</span>
                  )}
                </div>
              </div>
            </div>
            <ChevronRight size={18} className="text-[#c0b09d]" />
          </div>
        </div>

      </main>

      <footer className="p-6 pb-10 bg-[#f9f5ef]/90 backdrop-blur-md border-t border-[#e8dfd2]">
        <p className="text-[10px] text-[#8f7f6d] text-center font-medium mb-4">
            创建话题后，该话题产生的收益，将由所有同圈的创作者平分。
        </p>
        <button
          onClick={() => {
            // Mock a "created" topic
            const newTopic: Topic = {
              id: 'new-' + Date.now(),
              title: topicTitle || '未命名共创',
              description: '由你发起的新共创话题。',
              prompt: '捕捉你眼前的时刻',
              city: '上海',
              creator: CURRENT_USER.name,
              joinedCount: 1,
              targetCount: participants,
              deadline: '23h 59m',
              status: 'forming',
              tone: 'amber',
              mode: 'Video',
              likes: '0',
            };
            setSelectedTopic(newTopic);
            setScreen('topic-detail');
          }}
          className="w-full h-14 bg-[#FE2C55] text-white rounded-full font-black uppercase text-xs shadow-[0_18px_40px_rgba(254,44,85,0.22)] active:scale-95 transition-transform flex items-center justify-center"
        >
          发起召集
        </button>
      </footer>

      <VisibilitySelectorDrawer
        isOpen={showSelector}
        onClose={() => setShowSelector(false)}
        visibility={visibility}
        setVisibility={setVisibility}
        selectedFriendIds={selectedFriendIds}
        setSelectedFriendIds={setSelectedFriendIds}
      />
    </div>
  );
};

const CreateSuccessScreen = ({ setScreen, showToast }: { setScreen: (s: Screen) => void, showToast: (m: string) => void }) => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  return (
    <div className="flex flex-col h-full bg-dark items-center justify-center p-10 text-center space-y-8">
      <div className="relative">
         <div className="w-32 h-32 bg-emerald-500 rounded-[28px] flex items-center justify-center shadow-[0_0_80px_rgba(16,185,129,0.2)]">
            <Check size={64} className="text-white" strokeWidth={3} />
         </div>
      </div>
      <div className="space-y-3">
        <h2 className="text-3xl font-bold">主题已发布!</h2>
        <p className="text-white/40 text-sm leading-relaxed max-w-[240px]">你的共创邀请已同步至好友动态。快去拍摄你的第一帧吧。</p>
      </div>
      <div className="w-full space-y-3">
        <button onClick={() => setScreen('topic-detail')} className="w-full h-14 bg-white text-dark rounded-full font-black uppercase text-xs shadow-2xl active:scale-95 transition-transform">
          完成并返回
        </button>
        <button onClick={() => setIsInviteModalOpen(true)} className="w-full h-14 bg-white/10 backdrop-blur-xl rounded-full font-black uppercase text-xs active:scale-95 transition-transform border border-white/10 text-white/60">
          邀请好友加速成圈
        </button>
      </div>

      <AnimatePresence>
        <FriendSelectionModal
          isOpen={isInviteModalOpen}
          onClose={() => setIsInviteModalOpen(false)}
          remainingCount={10}
          onInvite={(friends) => {
            showToast(`已向 ${friends.length} 位好友发送邀请`);
            setIsInviteModalOpen(false);
          }}
        />
      </AnimatePresence>
    </div>
  );
};

const AlbumComposer = ({
  setScreen,
  showToast,
  source,
  topic,
  prevScreen,
}: {
  setScreen: (s: Screen) => void,
  showToast: (m: string) => void,
  source: 'create' | 'join',
  topic?: Topic,
  prevScreen: Screen,
}) => {
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState('');

  const handlePick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      setSelectedPreview(String(loadEvent.target?.result || ''));
      showToast('已从相册选择素材');
    };
    reader.readAsDataURL(file);
  };

  return (
    <main className="relative flex-1 overflow-y-auto px-6 pb-10 pt-32 no-scrollbar">
      <button
        onClick={() => setScreen(source === 'join' ? 'join' : prevScreen || 'home')}
        className="absolute left-6 top-12 z-20 flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/8 text-white backdrop-blur-md active:scale-95 transition-transform"
        aria-label="关闭"
      >
        <X size={22} />
      </button>
      <div className="mx-auto flex max-w-[360px] flex-col gap-5">
        <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4 shadow-2xl">
          <label className="relative flex aspect-[4/5] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[20px] border border-dashed border-white/18 bg-white/[0.03] active:scale-[0.99] transition-transform">
            {selectedPreview ? (
              <img src={selectedPreview} alt="" className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-black">
                  <ImageIcon size={28} />
                </div>
                <div>
                  <p className="text-lg font-black text-white">从相册选择</p>
                  <p className="mt-1 text-[11px] font-bold text-white/38">取第一帧作为共创封面</p>
                </div>
              </div>
            )}
            <input type="file" accept="image/*,video/*" className="hidden" onChange={handlePick} />
            {selectedPreview && (
              <div className="absolute left-3 top-3 rounded-full bg-black/52 px-3 py-1 text-[10px] font-black text-white backdrop-blur-md">
                第一帧封面
              </div>
            )}
          </label>
        </div>

        <div className="rounded-[20px] border border-white/8 bg-white/[0.04] p-4">
          <div className="mb-3 flex items-center justify-between">
            <label className="text-[10px] font-black uppercase tracking-[0.22em] text-white/38">写文字</label>
            <span className="text-[10px] font-black text-white/18">{caption.length}/80</span>
          </div>
          <textarea
            value={caption}
            onChange={(event) => setCaption(event.target.value.slice(0, 80))}
            placeholder={topic ? `回应：${topic.prompt}` : '写下这次共创想表达的内容'}
            className="h-28 w-full resize-none rounded-xl border border-white/8 bg-black/24 px-4 py-3 text-sm font-bold leading-relaxed text-white outline-none placeholder:text-white/18 focus:border-white/20"
          />
        </div>

        <button
          onClick={() => {
            if (!selectedPreview) {
              showToast('请先从相册选择素材');
              return;
            }
            if (!caption.trim()) {
              showToast('请写一句共创文字');
              return;
            }
            setScreen('video-edit');
          }}
          className="h-14 rounded-[18px] bg-white text-[12px] font-black uppercase tracking-widest text-black shadow-2xl active:scale-95 transition-transform"
        >
          {source === 'create' ? '发布共创' : '完成参与共创'}
        </button>
      </div>
    </main>
  );
};

const CreateAndShootScreen = ({ setScreen, showToast }: { setScreen: (s: Screen) => void, showToast: (m: string) => void }) => {
  return (
    <div className="flex flex-col h-full bg-black relative">
       <div className="absolute inset-0 transition-colors duration-700 bg-[#111]">
          <div className="w-full h-full flex flex-col items-center justify-center">
             <Camera size={64} className="text-white/5" />
             <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-[85%] aspect-[3/4.5] border border-white/5 rounded-[34px] relative">
                   <div className="absolute top-1/2 left-0 right-0 h-[0.5px] bg-white/5"></div>
                   <div className="absolute top-0 bottom-0 left-1/2 w-[0.5px] bg-white/5"></div>
                </div>
             </div>
          </div>
       </div>

       <div className="absolute inset-x-0 top-0 p-6 pt-12 flex items-center justify-between z-30">
          <button
            onClick={() => setScreen('topic-detail')}
            className="w-10 h-10 glass-pill rounded-xl flex items-center justify-center"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="text-center">
             <p className="text-[10px] font-black uppercase text-green-400 tracking-widest leading-none mb-1">
               最后一步
             </p>
             <h3 className="text-sm font-bold truncate max-w-[180px] text-white">
               正在捕捉
             </h3>
          </div>
          <div className="w-10"></div>
       </div>

       <div className="absolute inset-x-0 bottom-0 p-8 pb-12 z-30 flex flex-col gap-6">
          <div className="flex items-center justify-between px-4">
             <button onClick={() => showToast('美颜模式已开启')} className="w-12 h-12 glass-pill rounded-full flex items-center justify-center text-white active:scale-95 transition-transform backdrop-blur-md">
                <Sparkles size={22} />
             </button>
             <button
               onClick={() => setScreen('video-edit')}
               className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center active:scale-95 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)]"
             >
                <div className="w-14 h-14 bg-white rounded-full"></div>
             </button>
             <button className="w-12 h-12 glass-pill rounded-full flex items-center justify-center text-white active:scale-95 transition-transform backdrop-blur-md">
                <RotateCw size={22} />
             </button>
          </div>
          <p className="text-center text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">
            按下快门定格瞬间
          </p>
       </div>
    </div>
  );
};

const JoinScreen = ({ topic, setScreen, showToast }: { topic: Topic, setScreen: (s: Screen) => void, showToast: (m: string) => void }) => {
  const [showLandscapeHint, setShowLandscapeHint] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLandscapeHint(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-full flex-col bg-[#101010] text-white relative overflow-hidden">
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_84%,rgba(255,255,255,0.08),transparent_30%)]" />
       <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 pt-10">
          <button
            onClick={() => setScreen('topic-detail')}
            className="flex h-14 w-14 items-center justify-center rounded-[18px] border border-white/12 bg-white/10 text-white backdrop-blur-md active:scale-95 transition-transform"
            aria-label="返回话题详情"
          >
            <X size={28} />
          </button>
          <div className="w-14" />
       </div>

       <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pb-36 pt-28">
          <div className="relative w-full aspect-[4/5.1] rounded-[34px] border border-white/10 bg-white/[0.018] shadow-[inset_0_0_46px_rgba(255,255,255,0.03)]">
             <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/[0.07]" />
             <div className="absolute left-10 right-10 top-1/2 h-px -translate-y-1/2 bg-white/[0.07]" />
             <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[20px] border border-white/8 bg-black/10">
               <Camera size={44} className="text-white/[0.12]" />
             </div>
             <div className="absolute -right-4 top-1/2 flex min-h-[112px] -translate-y-1/2 flex-col items-center justify-center gap-2 rounded-full border border-white/10 bg-black/55 px-3 py-5 shadow-xl backdrop-blur-md">
               {Array.from(topic.title).map((char, index) => (
                 <span
                   key={`${char}-${index}`}
                   className="block rotate-90 text-[13px] font-black leading-none text-white/82"
                 >
                   {char}
                 </span>
               ))}
             </div>
          </div>
       </div>

       <div className="absolute inset-x-0 bottom-0 z-30 px-8 pb-12">
          <div className="flex items-center justify-between">
             <button onClick={() => showToast('美颜模式已开启')} className="flex h-16 w-16 items-center justify-center rounded-full border border-white/12 bg-white/10 text-white/86 active:scale-95 transition-transform">
                <Sparkles size={23} />
             </button>
             <button
               onClick={() => setScreen('video-edit')}
               className="flex h-24 w-24 items-center justify-center rounded-full border-[6px] border-white bg-black shadow-[0_0_64px_rgba(255,255,255,0.22)] active:scale-95 transition-transform"
               aria-label="拍摄"
             >
                <div className="h-16 w-16 rounded-full bg-white" />
             </button>
             <button onClick={() => showToast('已切换至前置摄像头')} className="flex h-16 w-16 items-center justify-center rounded-full border border-white/12 bg-white/10 text-white/86 active:scale-95 transition-transform">
                <RotateCw size={23} />
             </button>
          </div>
          <p className="mt-8 text-center text-[14px] font-black tracking-[0.34em] text-white/28">点击开始拍摄</p>
       </div>

       <AnimatePresence>
         {showLandscapeHint && (
           <motion.div
             initial={{ opacity: 0, y: 16 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -8 }}
             className="absolute left-1/2 top-[150px] z-40 w-[270px] -translate-x-1/2 rounded-xl border border-white/14 bg-white/10 px-4 py-3 text-center shadow-2xl backdrop-blur-xl"
           >
             <p className="text-sm font-black text-white">请横屏拍摄</p>
             <p className="mt-1 text-[10px] font-bold text-white/60">横向画面更适合合成 DR圈共创视频</p>
           </motion.div>
         )}
       </AnimatePresence>
    </div>
  );
};

const JoinSuccessScreen = ({ setScreen, showToast }: { setScreen: (s: Screen) => void, showToast: (m: string) => void }) => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  return (
    <div className="flex flex-col h-full bg-dark p-10 pt-16">
      <div className="flex-1 flex flex-col items-center justify-center space-y-10">
        <div className="relative">
           <motion.div
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             className="w-32 h-32 bg-white rounded-[28px] flex items-center justify-center shadow-[0_0_80px_rgba(255,255,255,0.2)]"
           >
             <ShieldCheck size={64} className="text-white" strokeWidth={2.5} />
           </motion.div>
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3 }}
             className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass-pill px-4 py-1.5 rounded-full text-[10px] font-black text-gold tracking-widest uppercase whitespace-nowrap shadow-xl"
           >
             已获得真实标记
           </motion.div>
        </div>

        <div className="space-y-4 text-center">
          <h2 className="text-4xl font-bold">拍摄完成!</h2>
          <p className="text-white/40 text-sm leading-relaxed max-w-[240px] mx-auto">
            你已成功贡献了一份回忆。当共创组达成目标后，完整的合集将同步推送到你的广场。
          </p>
        </div>

      </div>

      <div className="w-full space-y-3 pb-6 shrink-0 mt-6">
        <button onClick={() => setScreen('topic-detail')} className="w-full h-14 bg-white text-dark rounded-full font-black uppercase text-xs shadow-2xl active:scale-95 transition-transform">
          完成并返回
        </button>
        <button onClick={() => setIsInviteModalOpen(true)} className="w-full h-14 bg-white/10 backdrop-blur-xl rounded-full font-black uppercase text-xs active:scale-95 transition-transform border border-white/10 text-white/60">
          邀请好友助力
        </button>
      </div>

      <AnimatePresence>
        <FriendSelectionModal
          isOpen={isInviteModalOpen}
          onClose={() => setIsInviteModalOpen(false)}
          remainingCount={10}
          onInvite={(friends) => {
            showToast(`已向 ${friends.length} 位好友发送邀请`);
            setIsInviteModalOpen(false);
          }}
        />
      </AnimatePresence>

    </div>
  );
};

// --- Circle (Discover) Screen ---

const CircleScreen = ({
  setScreen,
  prevScreen,
  topics,
  setSelectedTopic,
  setSelectedUserName,
  savedTopicIds,
  toggleFavorite,
  likedTopicIds,
  toggleLike,
  spotlightTopicIds,
  spotlightTopic,
  showToast,
  diamondBalance,
  setDiamondBalance,
  initialTopicId,
  isMyWorkMode,
  setCircleIsMyWorkMode,
  setCircleInitialTopicId,
  setCircleInitialTopicInfo,
  isGiftDonorDetailModalOpen,
  setIsGiftDonorDetailModalOpen,
  setCirclePureMode,
  setReportTargetName,
  setReportType
}: {
  setScreen: (s: Screen) => void,
  prevScreen: Screen,
  topics: Topic[],
  setSelectedTopic: (t: Topic) => void,
  setSelectedUserName: (name: string) => void,
  savedTopicIds: Set<string>,
  toggleFavorite: (id: string) => void,
  likedTopicIds: Set<string>,
  toggleLike: (id: string) => void,
  spotlightTopicIds: Set<string>,
  spotlightTopic: (id: string) => void,
  showToast: (m: string) => void,
  diamondBalance: number,
  setDiamondBalance: React.Dispatch<React.SetStateAction<number>>,
  initialTopicId?: string,
  isMyWorkMode?: boolean,
  setCircleIsMyWorkMode: (b: boolean) => void,
  setCircleInitialTopicId: (id: string | undefined) => void,
  setCircleInitialTopicInfo: (info: Partial<Topic> | undefined) => void,
  isGiftDonorDetailModalOpen: boolean,
  setIsGiftDonorDetailModalOpen: (val: boolean) => void,
  setCirclePureMode: (val: boolean) => void,
  setReportTargetName: (name: string) => void,
  setReportType: (type: 'account' | 'video') => void
}) => {
  const [activeTab, setActiveTab] = useState('推荐');
  const [circleIndex, setCircleIndex] = useState(0);
  const [isShareDrawerOpen, setIsShareDrawerOpen] = useState(false);
  const [isMoreDrawerOpen, setIsMoreDrawerOpen] = useState(false);
  const [isVisibilityDrawerOpen, setIsVisibilityDrawerOpen] = useState(false);
  const [visibility, setVisibility] = useState<Visibility>('public');
  const [selectedFriendIds, setSelectedFriendIds] = useState<Set<string>>(new Set());

  const [sharingTopic, setSharingTopic] = useState<Topic | null>(null);
  const [isGiftDrawerOpen, setIsGiftDrawerOpen] = useState(false);
  const [selectedGiftName, setSelectedGiftName] = useState(GIFTS[0]?.name || '');
  const [giftQuantity, setGiftQuantity] = useState(1);
  const [isGiftersDrawerOpen, setIsGiftersDrawerOpen] = useState(false);
  const [expandedCreatorsId, setExpandedCreatorsId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isPureMode, setIsPureMode] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState<any>(null);
  const [isHeatingModalOpen, setIsHeatingModalOpen] = useState(false);
  const [isGiftDonorModalOpen, setIsGiftDonorModalOpen] = useState(false);
  const [selectedShareUserIds, setSelectedShareUserIds] = useState<Set<string>>(new Set());
  const [showClearScreenHint, setShowClearScreenHint] = useState(true);
  const gestureStartRef = useRef<{ x: number; y: number } | null>(null);
  const ignoreNextClickRef = useRef(false);

  useEffect(() => {
    setCirclePureMode(isPureMode);
    return () => setCirclePureMode(false);
  }, [isPureMode, setCirclePureMode]);

  const toggleShareUser = (id: string) => {
    const next = new Set(selectedShareUserIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedShareUserIds(next);
  };

  const startLongPress = () => {
    setLongPressTimer(setTimeout(() => {
      setIsPureMode(prev => !prev);
    }, 600));
  };

  const endLongPress = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const startPointerGesture = (event: React.PointerEvent<HTMLElement>) => {
    gestureStartRef.current = { x: event.clientX, y: event.clientY };
    startLongPress();
  };

  const endPointerGesture = (event: React.PointerEvent<HTMLElement>) => {
    endLongPress();

    const start = gestureStartRef.current;
    gestureStartRef.current = null;
    if (!start) return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (deltaX > 72 && Math.abs(deltaY) < 64) {
      ignoreNextClickRef.current = true;
      setShowClearScreenHint(false);
      if (!isPureMode) {
        setIsPureMode(true);
      }
    }
  };

  const cancelPointerGesture = () => {
    endLongPress();
    gestureStartRef.current = null;
  };

  const handleShare = (topic: Topic) => {
    setSharingTopic(topic);
    setSelectedShareUserIds(new Set());
    setIsShareDrawerOpen(true);
  };

  const selectedGift = GIFTS.find((gift) => gift.name === selectedGiftName) || GIFTS[0];
  const giftTotalCost = selectedGift ? selectedGift.price * giftQuantity : 0;
  const giftQuantityOptions = [1, 3, 5, 10];
  const circleTabs = ['推荐', 'CP'];

  const sendSelectedGift = () => {
    if (!selectedGift) return;
    if (giftTotalCost > diamondBalance) {
      showToast('钻石不足，请先充值');
      return;
    }

    setDiamondBalance((prev) => prev - giftTotalCost);
    showToast(`已送出 ${giftQuantity} 个${selectedGift.name}`);
    setIsGiftDrawerOpen(false);
  };

  const circleTopics = activeTab === 'CP'
    ? topics.filter((_, index) => index % 2 === 0)
    : topics;
  const targetCircleTopic = initialTopicId ? circleTopics.find(t => t.id === initialTopicId) : undefined;
  const circleFeedTopics = isMyWorkMode
    ? circleTopics.filter(t => t.id === initialTopicId)
    : targetCircleTopic
      ? [targetCircleTopic, ...circleTopics.filter(t => t.id !== initialTopicId), ...circleTopics]
      : [...circleTopics, ...circleTopics];
  const circleCardTopics = circleTopics.filter(t => t.status !== 'completed');
  const currentCircleTopic = circleCardTopics[circleIndex % circleCardTopics.length] || topics[0];
  const circleIsFavorite = savedTopicIds.has(currentCircleTopic.id);
  const nextCircleTopic = () => setCircleIndex((prev) => (prev + 1) % circleCardTopics.length);
  const prevCircleTopic = () => setCircleIndex((prev) => (prev - 1 + circleCardTopics.length) % circleCardTopics.length);

  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#f7f3ec] pt-8 font-sans text-[#2f261d]">
      <header className="sticky top-0 z-30 bg-[#f7f3ec]/94 px-4 pb-3 pt-4 backdrop-blur-xl">
        <div className="flex items-center gap-5">
          {circleTabs.map(tab => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setCircleIndex(0);
              }}
              className={`relative h-10 px-1 text-[16px] font-black transition-colors ${
                activeTab === tab ? 'text-[#2f261d]' : 'text-[#9d8c7a]'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.span
                  layoutId="circleFeedTab"
                  className="absolute bottom-0 left-1/2 h-1 w-5 -translate-x-1/2 rounded-full bg-[#FE2C55]"
                />
              )}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 overflow-hidden px-4 pb-32 pt-1">
        <div className="relative h-full">
          {[0, 1].map((stackIndex) => {
            const topicIndex = (circleIndex + stackIndex + 1) % circleCardTopics.length;
            const topic = circleCardTopics[topicIndex] || currentCircleTopic;
            return (
              <div
                key={`light-circle-stack-${topic.id}-${stackIndex}`}
                className="absolute inset-x-4 top-5 h-[560px] rounded-[24px] border border-[#eadfce] bg-white shadow-[0_12px_30px_rgba(103,81,58,0.08)]"
                style={{
                  opacity: 0.58 - stackIndex * 0.18,
                  transform: `translateY(${18 + stackIndex * 16}px) scale(${0.96 - stackIndex * 0.035})`,
                  zIndex: stackIndex,
                }}
              />
            );
          })}

          <motion.article
            key={currentCircleTopic.id}
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            drag
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.22}
            whileDrag={{ scale: 0.975, rotate: 1 }}
            onDragEnd={(_, info) => {
              if (info.offset.x < -50 || info.velocity.x < -450 || info.offset.y < -50 || info.velocity.y < -450) {
                nextCircleTopic();
              } else if (info.offset.x > 50 || info.velocity.x > 450 || info.offset.y > 50 || info.velocity.y > 450) {
                prevCircleTopic();
              }
            }}
            onClick={() => {
              setSelectedTopic(currentCircleTopic);
              setScreen('topic-detail');
            }}
            className="relative z-20 h-[590px] overflow-hidden rounded-[24px] border border-[#eadfce] bg-white shadow-[0_20px_44px_rgba(103,81,58,0.14)] active:scale-[0.99] transition-transform"
          >
            <div className="relative h-[360px] overflow-hidden bg-black">
              {currentCircleTopic.status === 'completed' ? (
                <div className="grid h-full w-full grid-cols-2 grid-rows-4 gap-px bg-black">
                  {Array.from({ length: 8 }).map((_, frameIndex) => {
                    const seed = (circleIndex * 2 + frameIndex) % dailyLifeFrames.length;
                    return (
                      <div key={frameIndex} className="relative overflow-hidden">
                        <img src={dailyLifeFrames[seed]} alt="" className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-black/16" />
                        <p className="absolute inset-x-2 top-1/2 -translate-y-1/2 text-center text-[12px] font-black leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
                          {dailyLifeCaptions[seed]}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <>
                  <img src={currentCircleTopic.image || dailyLifeFrames[circleIndex % dailyLifeFrames.length]} alt="" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/8 to-black/12" />
                </>
              )}

              <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleFavorite(currentCircleTopic.id);
                  }}
                  className={`ml-auto flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md active:scale-95 transition-transform ${
                    circleIsFavorite ? 'border-[#d6b27e] bg-[#d6b27e] text-white' : 'border-white/24 bg-black/22 text-white'
                  }`}
                  aria-label={circleIsFavorite ? '取消收藏' : '收藏'}
                >
                  <Star size={18} className={circleIsFavorite ? 'fill-current' : ''} />
                </button>
              </div>

              <div className="absolute left-5 right-5 bottom-5 text-white">
                <h2 className="text-[30px] font-black leading-[0.98] drop-shadow-[0_3px_12px_rgba(0,0,0,0.58)]">{currentCircleTopic.title}</h2>
              </div>

            </div>

            <button
              onClick={(event) => {
                event.stopPropagation();
                prevCircleTopic();
              }}
              className="absolute left-4 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/45 bg-white/62 text-[#2f261d] shadow-[0_10px_28px_rgba(47,38,29,0.18)] backdrop-blur-md active:scale-95 transition-transform"
              aria-label="上一个话题"
            >
              <ChevronLeft size={19} />
            </button>
            <button
              onClick={(event) => {
                event.stopPropagation();
                nextCircleTopic();
              }}
              className="absolute right-4 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/45 bg-white/62 text-[#2f261d] shadow-[0_10px_28px_rgba(47,38,29,0.18)] backdrop-blur-md active:scale-95 transition-transform"
              aria-label="下一个话题"
            >
              <ChevronRight size={19} />
            </button>

            <div className="space-y-5 px-5 py-5">
              <p className="line-clamp-2 min-h-[42px] text-[14px] font-bold leading-relaxed text-[#5f5145]">
                {currentCircleTopic.description}
              </p>

              <div className="rounded-[16px] bg-[#f7f3ec] p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-black text-[#9b8a79]">共创进度</span>
                  <span className="text-[11px] font-black text-[#b4834a]">
                    {currentCircleTopic.joinedCount}/{currentCircleTopic.targetCount}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#eadfce]">
                  <div
                    className="h-full rounded-full bg-[#FE2C55]"
                    style={{ width: `${Math.min(100, (currentCircleTopic.joinedCount / currentCircleTopic.targetCount) * 100)}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center">
                  {Array.from({ length: Math.min(6, currentCircleTopic.joinedCount) }).map((_, avatarIndex) => (
                    <img
                      key={`${currentCircleTopic.id}-creator-${avatarIndex}`}
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentCircleTopic.id}-${avatarIndex}`}
                      alt=""
                      className={`h-8 w-8 shrink-0 rounded-full border-2 border-white bg-[#f6ede3] ${avatarIndex > 0 ? '-ml-2' : ''}`}
                    />
                  ))}
                  {currentCircleTopic.joinedCount > 6 && (
                    <span className="-ml-2 flex h-8 min-w-8 items-center justify-center rounded-full border-2 border-white bg-[#f2e7db] px-1 text-[9px] font-black text-[#8f7f6d]">
                      +{currentCircleTopic.joinedCount - 6}
                    </span>
                  )}
                </div>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectedTopic(currentCircleTopic);
                    setScreen('join');
                  }}
                  className="h-12 shrink-0 rounded-full bg-[#FE2C55] px-5 text-[13px] font-black text-white shadow-[0_12px_26px_rgba(254,44,85,0.22)] active:scale-95 transition-transform"
                >
                  参与共创
                </button>
              </div>
            </div>
          </motion.article>
        </div>
      </main>
    </div>
  );



  return (
    <div className="flex flex-col h-full bg-black font-sans relative overflow-hidden">
      {/* Header Overlay */}
      <AnimatePresence>
        {!isPureMode && (
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 right-0 z-50 px-4 pt-12 flex items-center justify-between pointer-events-none"
          >
            {isMyWorkMode ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCircleIsMyWorkMode(false);
                  setCircleInitialTopicId(undefined);
                  setScreen(prevScreen || 'me');
                }}
                className="w-10 h-10 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white pointer-events-auto active:scale-90 transition-transform"
              >
                <ArrowLeft size={20} />
              </button>
            ) : (
              <>
                 <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/10 bg-black/36 p-1 backdrop-blur-xl">
                   {circleTabs.map(tab => (
                     <button
                       key={tab}
                       onClick={(e) => {
                         e.stopPropagation();
                         setActiveTab(tab);
                       }}
                       className={`h-8 rounded-full px-4 text-[11px] font-black transition-all ${
                         activeTab === tab ? 'bg-white text-black' : 'text-white/60'
                       }`}
                     >
                       {tab}
                     </button>
                   ))}
                 </div>
                 <div className="pointer-events-auto rounded-full border border-gold/20 bg-gold/14 px-3 py-2 text-[10px] font-black text-gold backdrop-blur-xl">
                   官方话题
                 </div>
              </>
            )}
          </motion.header>
        )}
      </AnimatePresence>
      <GiftDonorDetailModal
              isOpen={isGiftDonorDetailModalOpen}
              onClose={() => setIsGiftDonorDetailModalOpen(false)}
              gifts={MOCK_GIFT_RECORDS}
            />

      {isPureMode && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsPureMode(false);
          }}
          className="absolute right-4 bottom-6 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-black/24 text-white shadow-lg backdrop-blur-sm drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] active:scale-95 transition-transform"
          aria-label="退出清屏模式"
        >
          <FileOutput size={28} strokeWidth={2.5} />
        </button>
      )}

      {/* Full Screen Scroll Container */}
      <main className={`h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar ${isPureMode ? 'pb-0' : 'pb-24'}`}>
        {circleFeedTopics.map((topic, i) => {
          const isFavorite = savedTopicIds.has(topic.id);
          const isLiked = likedTopicIds.has(topic.id);
          const isSpotlighted = spotlightTopicIds.has(topic.id) || topic.status === 'completed';

          return (
            <section
              key={`${topic.id}-${i}`}
              className={`h-full w-full snap-start relative flex flex-col overflow-hidden ${
                isPureMode ? 'items-center justify-center pb-0' : 'justify-end pb-12'
              }`}
              onPointerDown={startPointerGesture}
              onPointerUp={endPointerGesture}
              onPointerLeave={cancelPointerGesture}
              onClick={(e) => {
                e.stopPropagation();
                if (ignoreNextClickRef.current) {
                  ignoreNextClickRef.current = false;
                  return;
                }
                setIsPaused(!isPaused);
              }}
            >
              {/* Play/Pause Indicator Animation */}
              <AnimatePresence>
                {isPaused && (
                   <motion.div
                     initial={{ opacity: 0, scale: 0.5 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 1.5 }}
                     className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
                   >
                     <div className="w-20 h-20 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-2xl">
                        <Play size={42} className="text-white fill-white ml-1" strokeWidth={3} />
                     </div>
                   </motion.div>
                )}
              </AnimatePresence>

              {/* Background */}
              <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-1000 ${
                topic.tone === 'blue' ? 'from-indigo-600 via-indigo-900' : 'from-amber-600 via-amber-900'
              } to-black z-0 shadow-inner`}>
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-6 gap-px bg-black">
                  {Array.from({ length: 12 }).map((_, frameIndex) => {
                    const frameSeed = (i * 3 + frameIndex) % dailyLifeFrames.length;
                    const userName = dailyLifeUsers[frameSeed];

                    return (
                      <div key={frameIndex} className="relative overflow-hidden bg-white/5">
                        <video
                          src={dailyLifeVideos[frameSeed]}
                          poster={dailyLifeFrames[frameSeed]}
                          className="h-full w-full object-cover"
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          onTimeUpdate={(event) => {
                            if (event.currentTarget.currentTime > 5) {
                              event.currentTarget.currentTime = 0;
                            }
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/8 to-black/20" />
                        <div className="absolute inset-x-3 top-1/2 -translate-y-1/2">
                          <p className="line-clamp-2 text-center text-[13px] font-black leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
                            {dailyLifeCaptions[frameSeed]}
                          </p>
                        </div>
                        <div className="absolute bottom-2 left-2 right-2 flex min-w-0 items-center gap-1.5">
                          <img
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`}
                            alt=""
                            className="h-5 w-5 shrink-0 rounded-full border border-white/45 bg-white/80 object-cover"
                          />
                          <span className="truncate text-[9px] font-black text-white/88 drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)]">
                            {userName}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className={`absolute inset-0 bg-black/20 transition-opacity ${isPaused ? 'opacity-100' : 'opacity-0'}`}></div>
              </div>

              {!isPureMode && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-44 bg-gradient-to-t from-black/85 via-black/48 to-transparent" />
              )}

              {/* Interaction Bar (Fixed Right) */}
              <AnimatePresence>
                {!isPureMode && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="absolute right-2 bottom-16 z-20 flex flex-col items-center gap-4"
                  >
                    <div className="relative mb-2">
                      <div className="w-14 h-14 rounded-full border-2 border-white/20 p-0.5 bg-dark">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${topic.creator}`} alt="" className="w-full h-full rounded-full object-cover" />
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTopic(topic);
                          setScreen('join');
                        }}
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-red-primary rounded-full flex items-center justify-center text-white border-2 border-dark"
                      >
                        <Plus size={15} strokeWidth={3} />
                      </button>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleLike(topic.id); }}
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] ${
                          isLiked ? 'text-red-500' : 'text-white'
                        }`}
                      >
                        <Heart size={28} strokeWidth={2.5} className="fill-current" />
                      </button>
                      <span className="text-[10px] font-black text-white/80">{topic.likes}</span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); setShowComments(true); }}
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white active:scale-95 transition-transform drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
                      >
                        <MessageCircle size={28} strokeWidth={2.5} className="fill-current" />
                      </button>
                      <span className="text-[10px] font-black text-white/80">42</span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(topic.id); }}
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] ${
                          isFavorite ? 'text-gold' : 'text-white'
                        }`}
                      >
                        <Star size={28} strokeWidth={2.5} className="fill-current" />
                      </button>
                      <span className="text-[10px] font-black text-white/80">
                        {topic.bookmarks && topic.bookmarks !== '0' ? topic.bookmarks : '收藏'}
                      </span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSharingTopic(topic);
                          if (isMyWorkMode) {
                            setIsMoreDrawerOpen(true);
                          } else {
                            handleShare(topic);
                          }
                        }}
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white active:scale-95 transition-transform drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
                      >
                        {isMyWorkMode ? <MoreHorizontal size={28} strokeWidth={3} /> : <CornerUpRight size={28} strokeWidth={3} />}
                      </button>
                      <span className="text-[10px] font-black text-white/80">
                        {isMyWorkMode ? '更多' : (topic.shares && topic.shares !== '0' ? topic.shares : '分享')}
                      </span>
                    </div>

                    <div className="relative flex flex-col items-center gap-1">
                      {showClearScreenHint && (
                        <div className="pointer-events-none absolute right-[42px] top-[18px] z-10 flex -translate-y-1/2 items-center">
                          <div className="whitespace-nowrap rounded-full border border-white/14 bg-black/52 px-3 py-1.5 text-[10px] font-black leading-none text-white/88 shadow-[0_8px_24px_rgba(0,0,0,0.34)] backdrop-blur-md">
                            右滑或点这里，清爽看全屏
                          </div>
                          <div className="h-px w-3 bg-white/36" />
                          <div className="h-1.5 w-1.5 rounded-full bg-white/70 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                        </div>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowClearScreenHint(false);
                          setIsPureMode(true);
                        }}
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-white active:scale-95 transition-all drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] ${
                          showClearScreenHint ? 'bg-white/10 ring-1 ring-white/35 shadow-[0_0_18px_rgba(255,255,255,0.18)]' : ''
                        }`}
                        aria-label="进入清屏模式"
                      >
                        <FileX size={28} strokeWidth={2.5} />
                      </button>
                      <span className="text-[10px] font-black text-white/80">清屏</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <HeatingConfirmationModal
                isOpen={isHeatingModalOpen}
                onClose={() => setIsHeatingModalOpen(false)}
                onConfirm={() => sharingTopic && spotlightTopic(sharingTopic.id)}
              />

              {/* Infobar (Bottom Left) */}
              <AnimatePresence>
                {!isPureMode && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="relative z-10 max-w-[78%] px-6 -mb-7 space-y-2.5 pointer-events-auto"
                  >
                    <p className="flex items-start gap-2 text-[22px] font-black leading-[1.05] tracking-normal text-white drop-shadow-[0_3px_14px_rgba(0,0,0,0.72)]">
                      <span className="min-w-0">{topic.title}</span>
                      {isSpotlighted && (
                        <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-gold/18 text-gold shadow-[0_4px_14px_rgba(0,0,0,0.38)]">
                          <Flame size={11} className="fill-current" />
                        </span>
                      )}
                    </p>

                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedCreatorsId(expandedCreatorsId === topic.id ? null : topic.id);
                      }}
                      className="flex w-fit origin-left cursor-pointer items-center gap-2 rounded-full bg-black/26 py-1 pr-2.5 active:scale-95 transition-transform backdrop-blur-[2px]"
                    >
                        <div className={`flex ${expandedCreatorsId === topic.id ? 'flex-wrap gap-2' : '-space-x-2'}`}>
                          {Array.from({ length: expandedCreatorsId === topic.id ? topic.joinedCount : Math.min(topic.joinedCount, 3) }).map((_, i) => (
                            <motion.div
                              layout
                              key={i}
                              onClick={(e) => {
                                if (expandedCreatorsId === topic.id) {
                                  e.stopPropagation();
                                  setSelectedUserName(`共创者 ${i + 1}`);
                                  setScreen('user-profile');
                                }
                              }}
                              className={`overflow-hidden rounded-full border-2 border-black/70 ${expandedCreatorsId === topic.id ? 'h-8 w-8 shadow-lg active:scale-90 transition-transform' : 'h-7 w-7'}`}
                            >
                              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${topic.id + i}`} alt="" className="w-full h-full object-cover" />
                            </motion.div>
                          ))}
                          {expandedCreatorsId !== topic.id && topic.joinedCount > 3 && (
                              <div className="z-10 -ml-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-black/70 bg-white/16 backdrop-blur-md">
                                <span className="text-[8px] font-black text-white/90">+{topic.joinedCount - 3}</span>
                              </div>
                          )}
                        </div>
                      <span className="whitespace-nowrap text-[10px] font-black uppercase tracking-wider text-white/58 drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
                          {topic.status === 'completed' ? `${topic.joinedCount}人共创` : '参与共创'}
                          <ChevronRight size={12} className={`inline-block ml-0.5 transition-transform ${expandedCreatorsId === topic.id ? 'rotate-90' : ''}`} />
                        </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          );
        })}
      </main>

       <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute inset-x-0 bottom-0 h-[60%] bg-dark/95 backdrop-blur-2xl rounded-t-[32px] z-[60] border-t border-white/5 flex flex-col pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mt-3 mb-6 flex-shrink-0" onClick={() => setShowComments(false)} />
            <div className="px-6 pb-4 flex items-center justify-between">
              <h3 className="font-bold text-white flex items-center gap-2">
                评论 <span className="text-white/20 text-xs">42</span>
              </h3>
              <button onClick={() => setShowComments(false)} className="text-white/40 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 space-y-6 no-scrollbar">
              {[
                { name: '南川', text: '这种拼在一起的日常很有生命力。', time: '12h' },
                { name: 'Echo', text: '比普通 vlog 更像一群人的共同记忆。', time: '15h' },
                { name: '林野', text: '想知道这是哪个城市的街景。', time: '18h' },
              ].map((cmt, i) => (
                <div key={i} className="flex gap-3">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${cmt.name}`} alt="" className="w-8 h-8 rounded-full border border-white/10 bg-white/5" />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-black text-white/30 tracking-widest uppercase">{cmt.name}</p>
                      <span className="text-[9px] text-white/10">{cmt.time} · IP：{['广东', '浙江', '上海', '北京', '四川'][i % 5]}</span>
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed">{cmt.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-black/40 border-t border-white/5 pb-10">
              <div className="flex gap-3 items-center">
                <input
                  type="text"
                  placeholder="留下你的共创注脚..."
                  className="flex-1 h-12 bg-white/5 border border-white/10 rounded-xl px-5 text-sm font-bold focus:border-white/20 outline-none placeholder:text-white/10"
                />
                <button className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-dark">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isGiftDrawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => { e.stopPropagation(); setIsGiftDrawerOpen(false); }}
            className="absolute inset-0 z-[100] bg-[rgba(72,56,39,0.18)] backdrop-blur-sm flex flex-col justify-end"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#fffaf5] rounded-t-3xl pt-5 pb-4 shadow-[0_-10px_40px_rgba(103,81,58,0.14)] border-t border-[#eadfce] flex flex-col max-h-[76vh]"
            >
              <div className="w-12 h-1.5 bg-[#eadfce] rounded-full mx-auto mb-5 flex-shrink-0" />
              <div className="flex justify-between items-start px-6 pb-4">
                <div>
                  <h3 className="text-[#2f261d] font-bold text-lg">选择礼物</h3>
                  <p className="text-[10px] text-[#9f8f7e] font-black uppercase tracking-widest mt-1">赠送后将展示在评论区</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setScreen('recharge')}
                    className="h-8 rounded-full border border-[#eadfce] bg-white px-3 text-[11px] font-black text-[#2f261d] shadow-sm active:scale-95 transition-transform flex items-center gap-1.5"
                  >
                    <Gem size={13} />
                    {diamondBalance.toLocaleString()}
                  </button>
                  <button onClick={() => setIsGiftDrawerOpen(false)} className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-[#8f7f6d] border border-[#eadfce] active:scale-95 transition-transform shadow-sm">
                    <X size={16} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3 overflow-y-auto px-6 pb-4 no-scrollbar">
                {GIFTS.map((gift) => (
                  <button
                    key={gift.name}
                    onClick={() => {
                      setSelectedGiftName(gift.name);
                    }}
                    className={`relative bg-white border rounded-xl p-3 flex flex-col items-center gap-2 active:scale-95 transition-transform shadow-sm ${
                      selectedGiftName === gift.name ? 'border-[#FE2C55] shadow-[0_10px_24px_rgba(254,44,85,0.14)]' : 'border-[#eadfce]'
                    }`}
                  >
                    {selectedGiftName === gift.name && (
                      <span className="absolute right-2 top-2 h-4 w-4 rounded-full bg-[#FE2C55] text-white flex items-center justify-center">
                        <Check size={10} strokeWidth={4} />
                      </span>
                    )}
                    <span className="text-3xl leading-none">{gift.icon}</span>
                    <span className="text-[10px] font-black text-[#2f261d] leading-tight text-center">{gift.name}</span>
                    <span className="text-[9px] font-black text-[#FE2C55] tracking-widest">{gift.price}</span>
                  </button>
                ))}
              </div>

              <div className="border-t border-[#eadfce] bg-[#fffaf5]/95 px-5 pt-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[10px] font-black text-[#9f8f7e] uppercase tracking-widest">已选择</p>
                    <p className="mt-1 truncate text-sm font-black text-[#2f261d]">
                      {selectedGift?.icon} {selectedGift?.name}
                      <span className="ml-2 text-[#FE2C55]">{giftTotalCost.toLocaleString()}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-white border border-[#eadfce] p-1 shadow-sm">
                    <button
                      onClick={() => setGiftQuantity((q) => Math.max(1, q - 1))}
                      className="h-8 w-8 rounded-full text-lg font-black text-[#8f7f6d] active:scale-95 transition-transform"
                      aria-label="减少数量"
                    >
                      -
                    </button>
                    <span className="min-w-8 text-center text-sm font-black text-[#2f261d]">x{giftQuantity}</span>
                    <button
                      onClick={() => setGiftQuantity((q) => Math.min(99, q + 1))}
                      className="h-8 w-8 rounded-full text-lg font-black text-[#2f261d] active:scale-95 transition-transform"
                      aria-label="增加数量"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    {giftQuantityOptions.map((quantity) => (
                      <button
                        key={quantity}
                        onClick={() => setGiftQuantity(quantity)}
                        className={`h-8 min-w-10 rounded-full border px-3 text-[11px] font-black active:scale-95 transition-all ${
                          giftQuantity === quantity
                            ? 'border-[#2f261d] bg-[#2f261d] text-white'
                            : 'border-[#eadfce] bg-white text-[#8f7f6d]'
                        }`}
                      >
                        x{quantity}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={sendSelectedGift}
                    className="ml-auto h-10 min-w-[116px] rounded-full bg-[#FE2C55] px-5 text-sm font-black text-white shadow-[0_12px_26px_rgba(254,44,85,0.22)] active:scale-95 transition-transform disabled:opacity-50"
                    disabled={!selectedGift}
                  >
                    赠送
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isShareDrawerOpen && sharingTopic && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => { e.stopPropagation(); setIsShareDrawerOpen(false); }}
            className="absolute inset-0 z-[100] bg-black/60 backdrop-blur-sm flex flex-col justify-end"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111111] rounded-t-[32px] pt-6 pb-12 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] border-t border-white/5"
            >
              <div className="flex justify-between items-center px-6 mb-4">
                <h3 className="text-white text-sm font-black tracking-[0.2em] uppercase">分享给好友</h3>
                <button
                  onClick={() => setIsShareDrawerOpen(false)}
                  className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full text-white/40 active:scale-95 transition-transform"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Multi-select Friends List */}
              <div className="flex gap-4 overflow-x-auto no-scrollbar px-6 pb-2">
                {SHARE_FRIENDS.map((friend) => (
                  <button
                    key={friend.id}
                    className="flex flex-col items-center gap-2 min-w-[64px] group relative"
                    onClick={() => toggleShareUser(friend.id)}
                  >
                    <div className={`w-14 h-14 rounded-full overflow-hidden border-2 transition-all p-0.5 active:scale-95 ${
                      selectedShareUserIds.has(friend.id) ? 'border-red-primary bg-red-primary/10' : 'border-white/5 bg-white/5'
                    }`}>
                      <img src={friend.avatar} alt={friend.name} className="w-full h-full rounded-full object-cover" />
                    </div>

                    {/* Checkbox Overlay */}
                    <div className={`absolute top-0 right-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedShareUserIds.has(friend.id)
                        ? 'bg-red-primary border-red-primary opacity-100 scale-100'
                        : 'bg-black/20 border-white/20 opacity-40 scale-75'
                    }`}>
                      {selectedShareUserIds.has(friend.id) && <Check size={12} className="text-white" strokeWidth={4} />}
                    </div>

                    <span className={`text-[10px] font-black tracking-tight transition-colors ${
                      selectedShareUserIds.has(friend.id) ? 'text-white' : 'text-white/40'
                    }`}>
                      {friend.name}
                    </span>
                  </button>
                ))}
              </div>

              {/* Action Bar / Send Button */}
              <AnimatePresence>
                {selectedShareUserIds.size > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="px-6 py-2"
                  >
                    <button
                      onClick={() => {
                        showToast(`已向 ${selectedShareUserIds.size} 位好友发送共创邀请`);
                        setIsShareDrawerOpen(false);
                      }}
                      className="w-full h-14 bg-red-primary text-white rounded-xl font-black uppercase text-xs shadow-[0_10px_30px_rgba(255,36,66,0.3)] active:scale-95 transition-transform"
                    >
                      发送给 {selectedShareUserIds.size} 位好友
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="h-px bg-white/5 w-full mx-auto max-w-[80%] my-2" />

              {/* Other Sharing Channels */}
              <div className="flex gap-6 overflow-x-auto no-scrollbar px-6 pb-2">
                <button key="drawer2-gift" className="flex flex-col items-center gap-2 group" onClick={() => { setIsShareDrawerOpen(false); setIsGiftDrawerOpen(true); }}>
                  <div className="w-12 h-12 bg-[#FE2C55]/10 border border-[#FE2C55]/20 rounded-xl flex items-center justify-center text-[#FE2C55] active:scale-95 transition-transform">
                    <Gift size={24} />
                  </div>
                  <span className="text-[9px] font-black text-white/40 group-active:text-white uppercase tracking-tighter">赠送礼物</span>
                </button>
                <button key="drawer2-save-album" className="flex flex-col items-center gap-2 group" onClick={() => { showToast('已保存到本地相册'); setIsShareDrawerOpen(false); }}>
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/60 active:scale-95 transition-transform">
                    <ImageIcon size={20} />
                  </div>
                  <span className="text-[9px] font-black text-white/40 group-active:text-white uppercase tracking-tighter">保存至相册</span>
                </button>
                <button
                  key="drawer2-report"
                  className="flex flex-col items-center gap-2 group"
                  onClick={() => {
                    setReportType('video');
                    setReportTargetName(sharingTopic.title);
                    setIsShareDrawerOpen(false);
                    setScreen('report-user');
                  }}
                >
                  <div className="w-12 h-12 bg-red-primary/10 border border-red-primary/20 rounded-xl flex items-center justify-center text-red-primary active:scale-95 transition-transform">
                    <AlertTriangle size={20} />
                  </div>
                  <span className="text-[9px] font-black text-white/40 group-active:text-white uppercase tracking-tighter">举报作品</span>
                </button>
                <button
                  key="drawer2-copy-topic"
                  className="flex flex-col items-center gap-2 group"
                  onClick={() => {
                    setIsShareDrawerOpen(false);
                    setCircleInitialTopicInfo(sharingTopic);
                    setScreen('create-circle');
                    showToast('话题配置已复制，您可以修改后发布');
                  }}
                >
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/60 active:scale-95 transition-transform">
                    <Copy size={20} />
                  </div>
                  <span className="text-[9px] font-black text-white/40 group-active:text-white uppercase tracking-tighter">复制话题并创建</span>
                </button>
                <button
                  key="drawer2-heat-topic"
                  className="flex flex-col items-center gap-2 group"
                  onClick={() => {
                    setIsShareDrawerOpen(false);
                    setIsHeatingModalOpen(true);
                  }}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all active:scale-95 ${
                      spotlightTopicIds.has(sharingTopic.id) ? 'bg-gold/10 text-gold border-gold/30' : 'bg-white/5 text-white/40 border-white/10'
                  }`}>
                    <Flame size={20} className={spotlightTopicIds.has(sharingTopic.id) ? 'fill-current' : ''} />
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-tighter ${spotlightTopicIds.has(sharingTopic.id) ? 'text-gold' : 'text-white/40 group-active:text-white'}`}>
                    {spotlightTopicIds.has(sharingTopic.id) ? '已加热' : '加热话题'}
                  </span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMoreDrawerOpen && sharingTopic && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => { e.stopPropagation(); setIsMoreDrawerOpen(false); }}
            className="absolute inset-0 z-[110] bg-black/60 backdrop-blur-sm flex flex-col justify-end"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111111] rounded-t-[32px] pt-6 pb-12 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] border-t border-white/5"
            >
              <div className="flex justify-between items-center px-6 mb-6 flex-shrink-0">
                <h3 className="text-white text-sm font-black tracking-[0.2em] uppercase">更多选项</h3>
                <button
                  onClick={() => setIsMoreDrawerOpen(false)}
                  className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full text-white/40 active:scale-95 transition-transform"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="px-6 grid grid-cols-3 gap-4 mb-8 flex-shrink-0">
                {[
                  { icon: <CornerUpRight size={20} />, label: '分享片段', action: () => { setIsMoreDrawerOpen(false); setIsShareDrawerOpen(true); } },
                  { icon: <AlertTriangle size={20} className="text-red-primary" />, label: '举报作品', action: () => { setReportType('video'); setReportTargetName(sharingTopic.title); setIsMoreDrawerOpen(false); setScreen('report-user'); } },
                  ...(isMyWorkMode ? [
                    { icon: <ShieldCheck size={20} />, label: '权限设置', action: () => { setIsMoreDrawerOpen(false); setIsVisibilityDrawerOpen(true); } },
                    { icon: <Trash2 size={20} className="text-red-primary" />, label: '删除作品', action: () => { showToast('作品已申请删除'); setIsMoreDrawerOpen(false); } },
                  ] : []),
                ].map((item, i) => (
                  <button key={i} onClick={item.action} className="flex flex-col items-center gap-3 group">
                    <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center text-white/60 active:scale-95 transition-all group-hover:bg-white/10 group-hover:text-white">
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-bold text-white/30 group-active:text-white transition-colors text-center">{item.label}</span>
                  </button>
                ))}
              </div>

              <div className="px-6 space-y-2 flex-shrink-0">
                 <button onClick={() => { showToast('已保存到本地相册'); setIsMoreDrawerOpen(false); }} className="w-full flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 active:bg-white/10 transition-colors">
                    <span className="text-sm font-bold text-white/80">下载作品</span>
                    <ChevronRight size={16} className="text-white/20" />
                 </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <VisibilitySelectorDrawer
        isOpen={isVisibilityDrawerOpen}
        onClose={() => setIsVisibilityDrawerOpen(false)}
        visibility={visibility}
        setVisibility={setVisibility}
        selectedFriendIds={selectedFriendIds}
        setSelectedFriendIds={setSelectedFriendIds}
      />
      <AnimatePresence>
        {isGiftersDrawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => { e.stopPropagation(); setIsGiftersDrawerOpen(false); }}
            className="absolute inset-0 z-[100] bg-black/60 backdrop-blur-sm flex flex-col justify-end"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111111] rounded-t-3xl pt-6 pb-12 space-y-6 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] border-t border-white/5 flex flex-col max-h-[70vh]"
            >
              <div className="flex justify-between items-center px-6">
                <h3 className="text-white font-bold text-lg">赠送榜单</h3>
                <button onClick={() => setIsGiftersDrawerOpen(false)} className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full text-white/60 active:scale-95 transition-transform">
                  <X size={16} />
                </button>
              </div>

              <div className="h-px bg-white/5 w-full" />

              <div className="overflow-y-auto px-6 space-y-5 pb-6">
                {[
                    {name: 'Alex', diamond: 8000, img: 'G1', rank: 1},
                    {name: 'Soul', diamond: 5200, img: 'G2', rank: 2},
                    {name: 'Echo', diamond: 3100, img: 'G3', rank: 3},
                    {name: 'John', diamond: 1200, img: 'User4', rank: 4},
                    {name: 'Sarah', diamond: 800, img: 'User5', rank: 5},
                    {name: 'Mike', diamond: 400, img: 'Creator0', rank: 6},
                    {name: 'Emma', diamond: 100, img: 'Creator1', rank: 7},
                ].map((g) => (
                  <div key={g.rank} className="flex items-center gap-4">
                    <div className={`w-8 text-center font-black ${g.rank <= 3 ? 'text-gold text-xl' : 'text-white/40 text-sm'}`}>{g.rank}</div>
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${g.img}`} alt={g.name} className="w-10 h-10 rounded-full border border-white/10 bg-dark object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-white/90">{g.name}</p>
                    </div>
                    <div className="flex items-center gap-1.5 glass-pill px-3 py-1 rounded-full">
                      <Gift size={12} className="text-indigo-400" />
                      <span className="text-xs font-black tracking-widest text-white/80">{g.diamond}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main App ---

// --- Energy Detail Screen ---

const EnergyDetailScreen = ({ setScreen, prevScreen, balance }: { setScreen: (s: Screen) => void, prevScreen: Screen, balance: number }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'get' | 'use'>('all');
  const [showInfo, setShowInfo] = useState(false);

  const transactions = [
    { id: 1, type: 'get', title: '完成共创话题', amount: 500, time: '今天 09:41', icon: Zap },
    { id: 2, type: 'get', title: '获得他人赠送的礼物', amount: 200, time: '今天 08:30', icon: Gift },
    { id: 3, type: 'use', title: '兑换「星轨戒指」', amount: -600, time: '昨天 21:15', icon: Heart },
    { id: 4, type: 'get', title: '每日登录奖励', amount: 50, time: '昨天 08:00', icon: Flame },
    { id: 5, type: 'get', title: '连续共创 7 天奖励', amount: 1000, time: '3天前', icon: ShieldCheck },
    { id: 6, type: 'use', title: '解锁精选合集权限', amount: -300, time: '5天前', icon: Users },
  ];

  const filteredTransactions = transactions.filter(t => {
    if (activeTab === 'all') return true;
    return t.type === activeTab;
  });

  return (
    <div className={lightPageRoot}>
      <header className={lightHeaderShell}>
        <button onClick={() => setScreen(prevScreen)} className={lightIconButton}>
          <ArrowLeft size={20} />
        </button>
        <h2 className="font-bold text-[#2f261d] text-lg tracking-tight">积分明细</h2>
        <button onClick={() => setShowInfo(!showInfo)} className={lightIconButton}>
          <HelpCircle size={20} />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-32">
        {/* Total Balance Card */}
        <section className="px-6 py-8">
          <div className="p-8 bg-gradient-to-br from-gold/10 via-card to-card rounded-[28px] border border-gold/10 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gold/5 blur-3xl -mr-24 -mt-24 pointer-events-none"></div>
            <div className="flex justify-between items-start relative z-10">
              <div className="space-y-2">
                <p className="text-xs font-black uppercase text-gold tracking-widest">当前积分总值</p>
                <div className="flex items-baseline gap-2">
                  <h1 className="text-6xl font-bold text-white">{balance.toLocaleString()}</h1>
                  <Zap size={24} className="text-gold fill-gold animate-pulse" />
                </div>
              </div>
              <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold border border-gold/20">
                <Flame size={24} fill="currentColor" />
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                <p className="text-[10px] font-black text-white/30 uppercase mb-1">今日获得</p>
                <p className="text-xl font-bold text-green-400">+750</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                <p className="text-[10px] font-black text-white/30 uppercase mb-1">本周消耗</p>
                <p className="text-xl font-bold text-rose-500">-600</p>
              </div>
            </div>
          </div>
        </section>

        {/* Info Explainer */}
        <AnimatePresence>
          {showInfo && (
            <motion.section
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-6 mb-6 overflow-hidden"
            >
              <div className="p-6 bg-soft rounded-[24px] border border-white/10 space-y-4">
                <div className="flex items-center gap-2 text-gold">
                  <ShieldCheck size={16} />
                  <h4 className="text-sm font-bold">关于“积分值”</h4>
                </div>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-white/80">什么是积分？</p>
                    <p className="text-[11px] text-white/40 leading-relaxed italic">积分是 DR圈共创活跃度的象征，它记录了你对每一个共创话题的参与和对他人的贡献。</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-white/80">如何获得？</p>
                    <ul className="text-[11px] text-white/40 list-disc list-inside space-y-1 italic">
                      <li>发起话题：500 积分</li>
                      <li>参与并合拍：300 积分</li>
                      <li>收到礼物：积分值会根据礼物价值增加</li>
                      <li>每日登录：50 积分</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Tabs */}
        <section className="px-6 mb-4">
          <div className="flex bg-soft p-1 rounded-xl border border-white/5">
            {[
              { id: 'all', label: '全部记录' },
              { id: 'get', label: '获取' },
              { id: 'use', label: '消耗' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${
                  activeTab === tab.id ? 'bg-white text-dark shadow-md' : 'text-white/40 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* Transaction Legend/Info in Header of list */}
        <section className="px-6 mb-2">
           <div className="flex justify-between items-center text-[10px] font-black text-white/10 uppercase tracking-widest px-2">
              <span>项目</span>
              <span>数额/时间</span>
           </div>
        </section>

        {/* Transaction History List */}
        <section className="px-6 space-y-3">
          {filteredTransactions.map((tx, i) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 bg-card bento-card border border-white/5 flex items-center justify-between group active:scale-[0.98] transition-transform shadow-lg"
            >
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border border-white/[0.03] shrink-0 ${
                  tx.type === 'get' ? 'bg-green-500/10 text-green-400' : 'bg-rose-500/10 text-rose-500'
                }`}>
                  <tx.icon size={20} strokeWidth={2.5} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold truncate pr-4 text-white">{tx.title}</h4>
                  <p className="text-[10px] text-white/20 font-black uppercase tracking-widest mt-1">{tx.time}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-lg font-black ${tx.type === 'get' ? 'text-green-400' : 'text-white/80'}`}>
                  {tx.type === 'get' ? '+' : ''}{tx.amount}
                </p>
                <div className="flex items-center justify-end gap-1 text-gold">
                  <Zap size={10} fill="currentColor" />
                </div>
              </div>
            </motion.div>
          ))}
          {filteredTransactions.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-white/20 text-xs font-black uppercase tracking-widest">暂无记录</p>
            </div>
          )}
        </section>

        {/* Explanatory Module */}
        <section className="p-6 mt-6">
           <div className="bento-card bg-gold p-8 space-y-6 relative overflow-hidden shadow-xl">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 blur-3xl -mb-16 -mr-16"></div>
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Star size={16} fill="currentColor" className="text-white" />
                 </div>
                 <h4 className="font-bold text-lg text-white">积分等级：精英合创者</h4>
              </div>
              <p className="text-white/80 text-sm leading-relaxed italic">
                 你当前的积分储备已超过全城 85% 的用户。高积分用户在发起话题时会获得优先全城推荐。
              </p>
              <div className="pt-4 flex gap-3">
                 <button className="flex-1 h-12 bg-white text-dark rounded-lg font-black uppercase text-[10px] active:scale-95 transition-transform shadow-xl">
                    查看等级特权
                 </button>
                 <button className="flex-1 h-12 bg-dark/20 text-dark rounded-lg font-black uppercase text-[10px] border border-dark/20 active:scale-95 transition-transform">
                    提升规则
                 </button>
              </div>
           </div>
        </section>
      </main>

      <footer className="p-6 pt-0 bg-dark/80 backdrop-blur-md border-t border-white/[0.03]">
         <button
           onClick={() => setScreen('shop')}
           className="w-full h-14 bg-white text-dark rounded-[18px] font-black uppercase text-xs shadow-2xl active:scale-95 transition-transform flex items-center justify-center gap-2"
         >
           去DR商城兑换权益 <ArrowLeft size={16} className="rotate-180" />
         </button>
      </footer>
    </div>
  );
};

// --- Video Edit Screen ---

const VideoEditScreen = ({ topic, setScreen, showToast, onPost, source = 'join' }: { topic: Topic, setScreen: (s: Screen) => void, showToast: (m: string) => void, onPost: (t: string, s: 'create' | 'join') => void, source?: 'create' | 'join' }) => {
  const [subtitle, setSubtitle] = useState('');
  const [posting, setPosting] = useState(false);
  const [isEditingText, setIsEditingText] = useState(false);

  const handlePost = () => {
    setPosting(true);
    setTimeout(() => {
      onPost(topic.id, source);

      if (source === 'create') {
        setScreen('create-success');
      } else {
        setScreen('join-success');
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-black relative">
       {/* Header */}
       <div className="absolute top-0 inset-x-0 pt-12 pb-4 flex items-center justify-between px-6 z-30 bg-gradient-to-b from-black/80 to-transparent">
          <button
            onClick={() => setScreen(source === 'create' ? 'create-and-shoot' : 'join')}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-md"
          >
            <ArrowLeft size={20} />
          </button>
          <h3 className="text-sm font-black uppercase text-white tracking-widest">编辑作品</h3>
          <div className="w-10"></div>
       </div>

       {/* Preview Area */}
       <div className="flex-1 flex flex-col items-center justify-center p-6 pt-20 pb-4 overflow-hidden">
          <div className="w-full max-h-[450px] aspect-[9/16] rounded-[28px] bg-[#111] shadow-2xl border border-white/10 relative overflow-hidden flex flex-col items-center justify-center transition-all duration-500">
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

             {/* Subtitle Overlay */}
             <div className="absolute top-1/2 inset-x-8 -translate-y-1/2 text-center z-10 px-4">
                <AnimatePresence>
                  {subtitle && (
                    <motion.p
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-white text-lg font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] leading-tight"
                    >
                      {subtitle}
                    </motion.p>
                  )}
                </AnimatePresence>
             </div>

             <div className="text-white/5 opacity-50">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Camera size={60} />
                </motion.div>
             </div>
          </div>
       </div>

       {/* Edit Controls */}
       <div className="bg-dark border-t border-white/5 p-6 pb-12 space-y-5">
          <div className="space-y-3">
             <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] font-black uppercase text-white/40 tracking-widest">编辑视频字幕 (选填)</label>
                <span className="text-[9px] text-white/10 uppercase font-black">{subtitle.length}/30</span>
             </div>
             <div className="relative group">
                <input
                  className={`w-full h-12 bg-white/5 rounded-lg px-5 pr-12 font-bold outline-none border transition-all ${isEditingText ? 'border-gold bg-white/10' : 'border-white/5 focus:border-white/20'} text-sm text-white`}
                  placeholder="给这段作品加句内心独白..."
                  maxLength={30}
                  value={subtitle}
                  onFocus={() => setIsEditingText(true)}
                  onBlur={() => setTimeout(() => setIsEditingText(false), 200)}
                  onChange={(e) => setSubtitle(e.target.value)}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {subtitle && (
                    <button onClick={() => setSubtitle('')} className="w-8 h-8 rounded-full flex items-center justify-center text-white/20 hover:text-white transition-colors">
                      <X size={16} />
                    </button>
                  )}
                </div>
             </div>
          </div>

          <div className="flex gap-4 pt-1">
             <button
               onClick={() => setScreen(source === 'create' ? 'create-and-shoot' : 'join')}
               disabled={posting}
               className="flex-1 h-14 bg-white/5 border border-white/5 rounded-xl font-black uppercase text-[10px] tracking-widest active:scale-95 transition-all text-white/40 flex items-center justify-center gap-2"
             >
                <RotateCw size={14} /> 重拍
             </button>
             <button
               onClick={handlePost}
               disabled={posting}
               className="flex-[2] h-14 bg-white text-dark rounded-xl font-black uppercase text-[10px] tracking-widest shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-2 relative overflow-hidden"
             >
                {posting ? (
                  <>
                    <RotateCw size={14} className="animate-spin" />
                    <span>发布中...</span>
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 bg-gold"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1.5 }}
                    />
                  </>
                ) : (
                  <>
                    {source === 'create' ? '发起召集并发布' : '完成并发布'} <Check size={16} strokeWidth={4} />
                  </>
                )}
             </button>
          </div>
       </div>
    </div>
  );
};

interface UserVlog {
  id: string;
  topicId: string;
  title: string;
  timestamp: number;
  type: string;
  status: string;
  image: string;
  likes: string;
}

interface EditableProfile {
  name: string;
  userId: string;
  avatar: string;
  bio: string;
  gender: string;
  birthday: string;
  ipLocation: string;
}

// --- Feedback Screen ---

const FeedbackScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  const [feedbackText, setFeedbackText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => setSelectedImage(event.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-dark pt-8 p-6">
      <header className="flex items-center justify-between mb-8">
        <button onClick={() => setScreen('me')} className="w-10 h-10 glass-pill rounded-xl flex items-center justify-center border border-white/5">
          <ArrowLeft size={20} className="text-white" />
        </button>
        <h2 className="font-bold text-white text-lg">用户反馈</h2>
        <div className="w-10 h-10"></div>
      </header>

      <div className="space-y-4">
        <textarea
          className="w-full h-40 bg-white/5 rounded-xl p-4 text-white placeholder-white/30"
          placeholder="请输入您的问题或建议..."
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
        />

        <div className="flex items-center gap-4">
           <input type="file" onChange={handleImageUpload} className="hidden" id="image-upload" />
           <label htmlFor="image-upload" className="w-20 h-20 rounded-xl bg-white/5 flex items-center justify-center text-white/40 border border-white/10 cursor-pointer">
             {selectedImage ? <img src={selectedImage} className="w-full h-full object-cover rounded-xl" alt="Preview"/> : <Plus size={24}/>}
           </label>
        </div>

        <button
          className="w-full h-14 bg-gold text-dark font-black rounded-xl"
          onClick={() => {
            console.log('Submitting:', feedbackText, selectedImage);
            setScreen('me');
          }}
        >
          提交反馈
        </button>
      </div>
    </div>
  );
};

const ContentDetailScreen = ({
  item,
  setScreen,
  setSelectedUserName,
  likedTopicIds,
  toggleLike,
  savedTopicIds,
  toggleFavorite,
  showToast,
  setReportType,
  setReportTargetName,
  setCircleInitialTopicInfo,
  spotlightTopic,
  isSpotlighted,
}: {
  item: HomeFeedItem,
  setScreen: (s: Screen) => void,
  setSelectedUserName: (name: string) => void,
  likedTopicIds: Set<string>,
  toggleLike: (id: string) => void,
  savedTopicIds: Set<string>,
  toggleFavorite: (id: string) => void,
  showToast: (m: string) => void,
  setReportType: (type: 'account' | 'video') => void,
  setReportTargetName: (name: string) => void,
  setCircleInitialTopicInfo: (topic: Partial<Topic> | undefined) => void,
  spotlightTopic: (id: string) => void,
  isSpotlighted: boolean,
}) => {
  const [commentText, setCommentText] = useState('');
  const [isPureMode, setIsPureMode] = useState(false);
  const [areCreatorsExpanded, setAreCreatorsExpanded] = useState(false);
  const [isShareDrawerOpen, setIsShareDrawerOpen] = useState(false);
  const [isCommentDrawerOpen, setIsCommentDrawerOpen] = useState(false);
  const [selectedShareUserIds, setSelectedShareUserIds] = useState<Set<string>>(new Set());
  const initialCountdownSeconds = item.kind === 'video' ? 18 : item.kind === 'cp' ? 42 : item.kind === 'collab' ? 68 : 0;
  const [remainingSeconds, setRemainingSeconds] = useState(initialCountdownSeconds);
  const isLiked = likedTopicIds.has(item.topic.id);
  const isSaved = savedTopicIds.has(item.topic.id);
  const isCollabLike = item.kind === 'collab' || item.kind === 'cp';
  const typeLabel = item.kind === 'collab' ? '共创完成' : item.kind === 'cp' ? 'CP共创完成' : item.kind === 'video' ? '视频完成' : '图片发布完成';
  const videoRemainingTime = initialCountdownSeconds > 0
    ? `${String(Math.floor(remainingSeconds / 60)).padStart(2, '0')}:${String(remainingSeconds % 60).padStart(2, '0')}`
    : '';
  const authorName = isCollabLike ? `${item.topic.joinedCount} 位共创人` : item.author;
  const comments = [
    ['Mia', '这个片段很有现场感，像刚好路过。'],
    ['周屿', item.kind === 'image' ? '这张图的光线好舒服。' : '完整内容点进来比信息流更清楚。'],
    ['Echo', isCollabLike ? '多人拼在一起的节奏很好。' : '想看更多同系列。'],
  ];

  useEffect(() => {
    setRemainingSeconds(initialCountdownSeconds);
  }, [initialCountdownSeconds, item.id]);

  useEffect(() => {
    if (initialCountdownSeconds <= 0) return;
    const timer = window.setInterval(() => {
      setRemainingSeconds(prev => (prev > 0 ? prev - 1 : initialCountdownSeconds));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [initialCountdownSeconds]);

  const sendComment = () => {
    if (!commentText.trim()) return;
    showToast('评论已发布');
    setCommentText('');
  };

  const toggleShareUser = (id: string) => {
    setSelectedShareUserIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const closeShareDrawer = () => {
    setIsShareDrawerOpen(false);
    setSelectedShareUserIds(new Set());
  };

  const shareDrawer = (
    <AnimatePresence>
      {isShareDrawerOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeShareDrawer}
          className="absolute inset-0 z-[100] flex flex-col justify-end bg-black/36 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            onClick={(event) => event.stopPropagation()}
            className="rounded-t-[32px] border-t border-[#eee4d8] bg-[#fffaf4] px-5 pb-10 pt-5 text-[#2f261d] shadow-[0_-18px_48px_rgba(47,38,29,0.18)]"
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-xl font-black tracking-[0.12em]">分享给好友</h3>
              <button
                onClick={closeShareDrawer}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f0e9df] text-[#7d6d5f] active:scale-95 transition-transform"
                aria-label="关闭分享弹窗"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
              {SHARE_FRIENDS.map((friend) => {
                const isSelected = selectedShareUserIds.has(friend.id);
                return (
                  <button
                    key={friend.id}
                    className="relative flex min-w-[68px] flex-col items-center gap-2 active:scale-95 transition-transform"
                    onClick={() => toggleShareUser(friend.id)}
                  >
                    <div className={`h-16 w-16 rounded-full border-[3px] p-0.5 transition-all ${
                      isSelected ? 'border-[#FE2C55] bg-[#FE2C55]/10' : 'border-[#eadfce] bg-white'
                    }`}>
                      <img src={friend.avatar} alt={friend.name} className="h-full w-full rounded-full object-cover" />
                    </div>
                    <div className={`absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all ${
                      isSelected ? 'border-[#FE2C55] bg-[#FE2C55] opacity-100' : 'border-[#d8ccbd] bg-[#fffaf4] opacity-80'
                    }`}>
                      {isSelected && <Check size={12} className="text-white" strokeWidth={4} />}
                    </div>
                    <span className={`max-w-[68px] truncate text-[12px] font-black ${isSelected ? 'text-[#2f261d]' : 'text-[#8f8173]'}`}>
                      {friend.name}
                    </span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {selectedShareUserIds.size > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  className="pb-4"
                >
                  <button
                    onClick={() => {
                      showToast(`已向 ${selectedShareUserIds.size} 位好友发送共创`);
                      closeShareDrawer();
                    }}
                    className="h-12 w-full rounded-xl bg-[#FE2C55] text-sm font-black text-white shadow-[0_12px_26px_rgba(254,44,85,0.24)] active:scale-[0.98] transition-transform"
                  >
                    发送给 {selectedShareUserIds.size} 位好友
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mb-4 h-px bg-[#eee4d8]" />

            <div className="flex gap-5 overflow-x-auto no-scrollbar pb-1">
              {[
                {
                  key: 'gift',
                  icon: Gift,
                  label: '赠送礼物',
                  tone: 'red',
                  action: () => {
                    showToast('已打开礼物选择');
                    closeShareDrawer();
                  },
                },
                {
                  key: 'save',
                  icon: ImageIcon,
                  label: '保存至相册',
                  tone: 'neutral',
                  action: () => {
                    showToast('已保存到本地相册');
                    closeShareDrawer();
                  },
                },
                {
                  key: 'report',
                  icon: AlertTriangle,
                  label: '举报',
                  tone: 'red',
                  action: () => {
                    setReportType('video');
                    setReportTargetName(item.title);
                    closeShareDrawer();
                    setScreen('report-user');
                  },
                },
                {
                  key: 'copy',
                  icon: Copy,
                  label: '复制话题',
                  tone: 'neutral',
                  action: () => {
                    setCircleInitialTopicInfo(item.topic);
                    closeShareDrawer();
                    setScreen('create-circle');
                    showToast('话题配置已复制，您可以修改后发布');
                  },
                },
              ].map((actionItem) => {
                const Icon = actionItem.icon;
                const isRed = actionItem.tone === 'red';
                const isGold = actionItem.tone === 'gold';
                return (
                  <button
                    key={actionItem.key}
                    className="group flex min-w-[76px] flex-col items-center gap-2 active:scale-95 transition-transform"
                    onClick={actionItem.action}
                  >
                    <div className={`flex h-14 w-14 items-center justify-center rounded-xl border ${
                      isRed
                        ? 'border-[#FE2C55]/20 bg-[#FE2C55]/10 text-[#FE2C55]'
                        : isGold
                          ? 'border-[#d6b27e]/30 bg-[#d6b27e]/12 text-[#b4834a]'
                          : 'border-[#e2d8ca] bg-[#f5efe7] text-[#7d6d5f]'
                    }`}>
                      <Icon size={23} className={isGold ? 'fill-current' : ''} />
                    </div>
                    <span className="text-[11px] font-black text-[#8f8173]">
                      {actionItem.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const commentDrawer = (
    <AnimatePresence>
      {isCommentDrawerOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCommentDrawerOpen(false)}
          className="absolute inset-0 z-[100] flex flex-col justify-end bg-black/36 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[72%] rounded-t-[32px] border-t border-[#eee4d8] bg-[#fffaf4] px-5 pb-8 pt-5 text-[#2f261d] shadow-[0_-18px_48px_rgba(47,38,29,0.18)]"
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-black">评论 17</h3>
              <button
                onClick={() => setIsCommentDrawerOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0e9df] text-[#7d6d5f] active:scale-95 transition-transform"
                aria-label="关闭评论"
              >
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[360px] space-y-5 overflow-y-auto no-scrollbar pb-5">
              {comments.map(([name, text], index) => (
                <div key={`${name}-${index}`} className="flex gap-3">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} alt="" className="h-9 w-9 shrink-0 rounded-full bg-white" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[12px] font-black text-[#8f8173]">{name}</p>
                      <button className="flex h-8 w-8 items-center justify-center text-[#b7a899] active:scale-95 transition-transform">
                        <Heart size={14} />
                      </button>
                    </div>
                    <p className="mt-1 text-[14px] font-bold leading-relaxed text-[#3f352d]">{text}</p>
                    <p className="mt-1 text-[11px] font-bold text-[#b7a899]">刚刚 · 回复</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 border-t border-[#eee4d8] pt-3">
              <input
                value={commentText}
                onChange={(event) => setCommentText(event.target.value)}
                onKeyDown={(event) => event.key === 'Enter' && sendComment()}
                placeholder="说点什么..."
                className="h-11 min-w-0 flex-1 rounded-full bg-white px-4 text-sm font-bold text-[#2f261d] outline-none placeholder:text-[#b7a899] shadow-sm"
              />
              <button
                onClick={sendComment}
                className="h-11 rounded-full bg-[#FE2C55] px-5 text-sm font-black text-white active:scale-95 transition-transform"
              >
                发送
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (item.kind !== 'image') {
    return (
      <div className="relative flex h-full flex-col overflow-hidden bg-black pt-8 text-white">
        <main className="relative flex-1 overflow-hidden bg-black">
          {isCollabLike ? (
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-6 gap-px bg-black">
              {Array.from({ length: 12 }).map((_, frameIndex) => {
                const frameSeed = (item.mediaIndex + frameIndex) % dailyLifeFrames.length;
                return (
                  <div key={frameIndex} className="relative overflow-hidden bg-[#111]">
                    <img src={dailyLifeFrames[frameSeed]} alt="" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/62 via-black/5 to-black/18" />
                    <p className="absolute inset-x-3 top-1/2 -translate-y-1/2 text-center text-[17px] font-black leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
                      {dailyLifeCaptions[frameSeed]}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <video
              src={dailyLifeVideos[item.mediaIndex]}
              poster={dailyLifeFrames[item.mediaIndex]}
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          )}

	          {!isPureMode && <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-4 pt-3">
	            <button onClick={() => setScreen('home')} className="flex h-10 w-10 items-center justify-center rounded-full bg-black/22 text-white backdrop-blur-md active:scale-95 transition-transform">
	              <ArrowLeft size={24} />
	            </button>
	            <div className="h-10 w-10" />
	            <button onClick={() => setIsShareDrawerOpen(true)} className="flex h-10 w-10 items-center justify-center rounded-full bg-black/22 text-white backdrop-blur-md active:scale-95 transition-transform" aria-label="分享">
	              <CornerUpRight size={24} />
	            </button>
	          </div>}

	          {!isPureMode && <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-64 bg-gradient-to-t from-black via-black/48 to-transparent" />}
	          {!isPureMode && <section className="absolute inset-x-0 bottom-0 z-20 px-5 pb-5">
	            <div className="flex items-center gap-3">
	              {isCollabLike ? (
                  <button
                    onClick={() => setAreCreatorsExpanded(prev => !prev)}
                    className="flex -space-x-2 active:scale-95 transition-transform"
                    aria-label={areCreatorsExpanded ? '收起共创人' : '展开共创人'}
                  >
                    {Array.from({ length: Math.min(4, item.topic.joinedCount) }).map((_, index) => {
                      const name = dailyLifeUsers[(item.mediaIndex + index) % dailyLifeUsers.length];
                      return <img key={name} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} alt="" className="h-8 w-8 rounded-full border-2 border-white/80 bg-white" />;
                    })}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedUserName(item.author);
                      setScreen('user-profile');
                    }}
                    className="flex -space-x-2 active:scale-95 transition-transform"
                    aria-label={`查看${item.author}主页`}
                  >
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.author}`} alt="" className="h-10 w-10 rounded-full border-2 border-white/80 bg-white" />
                  </button>
                )}
	              <button
	                onClick={() => {
	                  if (!isCollabLike) {
                    setSelectedUserName(item.author);
                    setScreen('user-profile');
                  }
                }}
                className="min-w-0 flex-1 text-left"
	              >
	                <p className="truncate text-lg font-black drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">{authorName}</p>
	              </button>
	              <div className="flex shrink-0 items-center gap-2">
	                <span className="rounded-full bg-black/42 px-3 py-1.5 text-[12px] font-black text-white/88 backdrop-blur-md">{videoRemainingTime}</span>
	                {!isCollabLike && (
	                  <button className="h-9 rounded-full bg-[#FE2C55] px-5 text-sm font-black text-white active:scale-95 transition-transform">
	                    关注
	                  </button>
	                )}
	              </div>
	            </div>
              {isCollabLike && areCreatorsExpanded && (
                <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar rounded-xl bg-black/26 p-2 backdrop-blur-md">
                  {Array.from({ length: item.topic.joinedCount }).map((_, index) => {
                    const name = dailyLifeUsers[(item.mediaIndex + index) % dailyLifeUsers.length];
                    return (
                      <button
                        key={`expanded-creator-${index}-${name}`}
                        onClick={() => {
                          setSelectedUserName(name);
                          setScreen('user-profile');
                        }}
                        className="shrink-0 active:scale-95 transition-transform"
                        aria-label={`查看${name}主页`}
                      >
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} alt="" className="h-8 w-8 rounded-full border border-white/70 bg-white" />
                      </button>
                    );
                  })}
                </div>
              )}
	            <p className="mt-4 line-clamp-2 text-[15px] font-bold leading-relaxed text-white/92 drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
	              {item.kind === 'cp' ? 'CP共创完成，一起记录两个人共同出现的瞬间。' : item.kind === 'collab' ? '多人共创完成，12 个真实片段拼成一条完整记忆。' : '视频完成，保留这一秒的动作、声音和现场感。'}
	            </p>
	          </section>}
	        </main>

	        <footer className="shrink-0 bg-black px-4 pb-6 pt-3">
	          <div className="flex items-center gap-3">
	            <button onClick={() => toggleLike(item.topic.id)} className="flex h-11 items-center gap-2 text-white active:scale-95 transition-transform">
	              <Heart size={30} className={isLiked ? 'fill-[#FE2C55] text-[#FE2C55]' : ''} strokeWidth={2.4} />
	              <span className="text-sm font-black">126</span>
            </button>
            <button onClick={() => toggleFavorite(item.topic.id)} className="flex h-11 items-center gap-2 text-white active:scale-95 transition-transform">
              <Star size={30} className={isSaved ? 'fill-white' : ''} strokeWidth={2.4} />
              <span className="text-sm font-black">29</span>
            </button>
            <button onClick={() => setIsCommentDrawerOpen(true)} className="flex h-11 items-center gap-2 text-white active:scale-95 transition-transform">
	              <MessageCircle size={30} strokeWidth={2.4} />
	              <span className="text-sm font-black">17</span>
	            </button>
              <button
                onClick={() => setIsPureMode(prev => !prev)}
                className="ml-auto flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white active:scale-95 transition-transform"
                aria-label={isPureMode ? '退出纯净模式' : '进入纯净模式'}
              >
                {isPureMode ? (
                  <FileOutput size={25} />
                ) : (
                  <span className="relative block h-5 w-5">
                    <span className="absolute left-0 top-0 h-2 w-2 rounded-tl-[3px] border-l-2 border-t-2 border-current" />
                    <span className="absolute right-0 top-0 h-2 w-2 rounded-tr-[3px] border-r-2 border-t-2 border-current" />
                    <span className="absolute bottom-0 left-0 h-2 w-2 rounded-bl-[3px] border-b-2 border-l-2 border-current" />
                    <span className="absolute bottom-0 right-0 h-2 w-2 rounded-br-[3px] border-b-2 border-r-2 border-current" />
                  </span>
                )}
              </button>
	          </div>
	        </footer>
          {shareDrawer}
          {commentDrawer}
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-[#fffaf4] pt-8 text-[#2f261d]">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[#eee4d8] bg-[#fffaf4]/94 px-4 py-3 backdrop-blur-xl">
        <button onClick={() => setScreen('home')} className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#2f261d] shadow-sm active:scale-95 transition-transform">
          <ArrowLeft size={20} />
        </button>
        <div className="min-w-0 text-center">
          <h2 className="truncate text-sm font-black">{item.title}</h2>
        </div>
        <button onClick={() => setIsShareDrawerOpen(true)} className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#2f261d] shadow-sm active:scale-95 transition-transform" aria-label="分享">
          <CornerUpRight size={19} />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-28">
        <section className="bg-black">
	          <div className="flex min-h-[420px] items-center justify-center bg-black">
	            <img src={dailyLifeFrames[item.mediaIndex]} alt="" className="max-h-[620px] w-full object-contain" />
	          </div>
        </section>

        <section className="space-y-5 px-4 py-5">
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => {
                setSelectedUserName(item.author);
                setScreen('user-profile');
              }}
              className="flex min-w-0 items-center gap-3 text-left"
            >
              <div className="flex -space-x-2">
                {isCollabLike ? Array.from({ length: Math.min(4, item.topic.joinedCount) }).map((_, index) => {
                  const name = dailyLifeUsers[(item.mediaIndex + index) % dailyLifeUsers.length];
                  return <img key={name} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} alt="" className="h-10 w-10 rounded-full border-2 border-[#fffaf4] bg-white" />;
                }) : (
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.author}`} alt="" className="h-10 w-10 rounded-full bg-white" />
                )}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-black">{authorName}</p>
                <p className="text-[11px] font-bold text-[#9b8a79]">{item.topic.city} · 刚刚发布</p>
              </div>
            </button>
            <button className="h-9 rounded-full bg-[#FE2C55] px-4 text-xs font-black text-white active:scale-95 transition-transform">
              关注
            </button>
          </div>

          <article className="space-y-2">
            <h1 className="text-xl font-black leading-tight">{item.title}</h1>
            <p className="text-[14px] font-medium leading-relaxed text-[#5f5145]">
              一张来自日常瞬间的图片发布，记录此刻真实的光线和情绪。
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {[typeLabel, item.topic.city, item.topic.prompt].map(tag => (
                <span key={tag} className="rounded-full bg-[#f2e8dc] px-3 py-1 text-[11px] font-black text-[#8f7f6d]">#{tag}</span>
              ))}
            </div>
          </article>

          <div className="h-px bg-[#eee4d8]" />

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black">评论 · 42</h3>
              <button className="text-[11px] font-black text-[#9b8a79]">按热度</button>
            </div>
            {comments.map(([name, text]) => (
              <div key={name} className="flex gap-3">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} alt="" className="h-8 w-8 shrink-0 rounded-full bg-white" />
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-black text-[#9b8a79]">{name}</p>
                  <p className="mt-1 text-[13px] font-bold leading-relaxed text-[#3f352d]">{text}</p>
                  <p className="mt-1 text-[10px] font-bold text-[#b7a899]">刚刚 · 回复</p>
                </div>
                <button className="flex h-8 w-8 items-center justify-center text-[#b7a899]">
                  <Heart size={14} />
                </button>
              </div>
            ))}
          </section>
        </section>
      </main>

      <footer className="absolute inset-x-0 bottom-0 z-40 border-t border-[#eee4d8] bg-[#fffaf4]/96 px-3 pb-6 pt-2 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <input
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && sendComment()}
            placeholder="说点什么..."
            className="h-10 min-w-0 flex-1 rounded-full bg-white px-4 text-sm font-bold text-[#2f261d] outline-none placeholder:text-[#b7a899] shadow-sm"
          />
          <button onClick={() => toggleLike(item.topic.id)} className={`flex h-10 min-w-12 items-center justify-center gap-1 rounded-full px-2 text-[11px] font-black ${isLiked ? 'text-[#FE2C55]' : 'text-[#7d6d5f]'}`}>
            <Heart size={20} className={isLiked ? 'fill-current' : ''} />
            {item.topic.likes}
          </button>
          <button
            onClick={() => toggleFavorite(item.topic.id)}
            className={`flex h-10 w-10 items-center justify-center rounded-full ${isSaved ? 'text-[#b4834a]' : 'text-[#7d6d5f]'}`}
            aria-label={isSaved ? '取消收藏' : '收藏'}
          >
            <Bookmark size={20} className={isSaved ? 'fill-current' : ''} />
          </button>
          <button onClick={sendComment} className="flex h-10 w-10 items-center justify-center rounded-full text-[#7d6d5f]">
            <MessageCircle size={20} />
          </button>
        </div>
      </footer>
      {shareDrawer}
      {commentDrawer}
    </div>
  );
};

export default function App() {
  useEffect(() => {
    document.body.dataset.appReady = '1';
    return () => {
      delete document.body.dataset.appReady;
    };
  }, []);

  const [screen, setScreen] = useState<Screen>(() => (
    new URLSearchParams(window.location.search).get('preview')?.startsWith('me-growth') ? 'me' : 'home'
  ));
  const [prevScreen, setPrevScreen] = useState<Screen>('home');
  const [topics, setTopics] = useState<Topic[]>(TOPICS);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedContentItem, setSelectedContentItem] = useState<HomeFeedItem | null>(null);
  const [selectedUserName, setSelectedUserName] = useState<string>('林野');
  const [savedTopicIds, setSavedTopics] = useState<Set<string>>(new Set());
  const [likedTopicIds, setLikedTopics] = useState<Set<string>>(new Set());
  const [spotlightTopicIds, setSpotlightTopicIds] = useState<Set<string>>(new Set());
  const [diamondBalance, setDiamondBalance] = useState(1260);
  const [energyBalance] = useState(8420);
  const [userVlogs, setUserVlogs] = useState<UserVlog[]>([]);
  const [profile, setProfile] = useState<EditableProfile>({
    name: CURRENT_USER.name,
    userId: 'Dear6317B6SG',
    avatar: CURRENT_USER.avatar,
    bio: CURRENT_USER.bio,
    gender: CURRENT_USER.gender || '',
    birthday: '',
    ipLocation: CURRENT_USER.ipLocation || '广东',
  });
  const [toast, setToast] = useState<string | null>(null);
  const [initialNetworkTab, setInitialNetworkTab] = useState<'friends' | 'followers' | 'following'>('friends');
  const [circleInitialTopicId, setCircleInitialTopicId] = useState<string | undefined>(undefined);
  const [circleInitialTopicInfo, setCircleInitialTopicInfo] = useState<Partial<Topic> | undefined>(undefined);
  const [circleIsMyWorkMode, setCircleIsMyWorkMode] = useState<boolean>(false);
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
  const [albumComposerSource, setAlbumComposerSource] = useState<'create' | 'join'>('create');
  const [isGiftDonorDetailModalOpen, setIsGiftDonorDetailModalOpen] = useState(false);
  const [hasShownHomeGrowthPrompt, setHasShownHomeGrowthPrompt] = useState(true);
  const [isCirclePureMode, setIsCirclePureMode] = useState(false);
  const [blockedUserNames, setBlockedUserNames] = useState<Set<string>>(new Set());
  const [userRemarks, setUserRemarks] = useState<Record<string, string>>({});
  const [reportTargetName, setReportTargetName] = useState('林野');
  const [reportType, setReportType] = useState<'account' | 'video'>('account');

  useEffect(() => {
    if (screen === 'splash') {
      const timer = setTimeout(() => {
        setScreen('login');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const deleteVlog = (vlogId: string) => {
    if (!window.confirm('确定要删除这段记录吗？删除后该话题的共创人数将减少。')) {
      return;
    }

    const vlogToDelete = userVlogs.find(v => v.id === vlogId);
    if (!vlogToDelete) return;

    setUserVlogs(prev => prev.filter(v => v.id !== vlogId));

    setTopics(prev => prev.map(t =>
      t.id === vlogToDelete.topicId
        ? { ...t, joinedCount: Math.max(0, t.joinedCount - 1) }
        : t
    ));

    if (selectedTopic && selectedTopic.id === vlogToDelete.topicId) {
      setSelectedTopic(prev => prev ? { ...prev, joinedCount: Math.max(0, prev.joinedCount - 1) } : null);
    }

    showToast('记录已删除');
  };

  const handlePostVlog = (topicId: string, source: 'create' | 'join') => {
    const topic = topics.find(t => t.id === topicId) || selectedTopic;
    if (!topic) return;

    const newVlog: UserVlog = {
      id: `vlog-${Date.now()}`,
      topicId: topic.id,
      title: topic.title,
      timestamp: Date.now(),
      type: source === 'create' ? '发起' : '参与',
      status: topic.status === 'completed' ? '已成圈' : '待成圈',
      image: `https://api.dicebear.com/7.x/identicon/svg?seed=${Date.now()}`,
      likes: '0'
    };

    setUserVlogs(prev => [newVlog, ...prev]);

    setTopics(prev => prev.map(t =>
      t.id === topic.id
        ? { ...t, joinedCount: t.joinedCount + 1 }
        : t
    ));

    if (selectedTopic && selectedTopic.id === topic.id) {
       setSelectedTopic(prev => prev ? { ...prev, joinedCount: prev.joinedCount + 1 } : null);
    }
  };

  const handleSetScreen = (newScreen: Screen) => {
    setPrevScreen(screen);
    if (newScreen !== 'circle') {
      setIsCirclePureMode(false);
    }
    setScreen(newScreen);
  };

  const blockUser = (name: string) => {
    setBlockedUserNames(prev => {
      const next = new Set(prev);
      next.add(name);
      return next;
    });
    showToast('已加入黑名单');
  };

  const unblockUser = (name: string) => {
    setBlockedUserNames(prev => {
      const next = new Set(prev);
      next.delete(name);
      return next;
    });
    showToast('已解除拉黑');
  };

  const dismissHomeGrowthPrompt = () => {
    setHasShownHomeGrowthPrompt(true);
  };

  const toggleFavorite = (id: string) => {
    setSavedTopics(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleLike = (id: string) => {
    setLikedTopics(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const spotlightTopic = (id: string) => {
    const cost = 100;
    if (diamondBalance < cost) {
      showToast('钻石余额不足，请先充值');
      return;
    }

    setDiamondBalance(prev => prev - cost);
    setSpotlightTopicIds(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    showToast('话题加热成功！已进入热门展示区');
  };

  const openContentDetail = (item: HomeFeedItem) => {
    setSelectedContentItem(item);
    setSelectedTopic(item.topic);
    handleSetScreen('content-detail');
  };

// --- Gift Screen ---

const GiftScreen = ({ setScreen, prevScreen, showToast }: { setScreen: (s: Screen) => void, prevScreen: Screen, showToast: (m: string) => void }) => {
  return (
    <div className="flex flex-col h-full bg-dark/95 backdrop-blur-3xl pt-8">
      {/* ... */}
      <main className="flex-1 p-6 overflow-y-auto no-scrollbar">
{/* ... */}
      </main>

      <footer className="p-8 border-t border-white/5 flex items-center justify-between">
         <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-indigo-400 rounded-md rotate-45"></div>
            <span className="font-bold text-sm">628</span>
            <button onClick={() => setScreen('recharge')} className="text-[10px] text-indigo-400 font-black uppercase tracking-widest ml-1">充值</button>
         </div>
         <button
           onClick={() => {
             showToast('礼物已送出，稍后将在评论区展示！');
             setTimeout(() => setScreen(prevScreen), 800);
           }}
           className="h-12 px-10 bg-white text-dark rounded-full font-black text-xs uppercase shadow-2xl active:scale-95 transition-transform"
         >
            立即赠送
         </button>
      </footer>
    </div>
  );
};

  const renderScreen = () => {
    const sS = handleSetScreen;
    switch (screen) {
      case 'splash':
        return <SplashScreen />;
      case 'login':
        return <LoginScreen setScreen={sS} showToast={showToast} />;
      case 'home':
        return (
          <HomeScreen
            setScreen={sS}
            setSelectedTopic={setSelectedTopic}
            topics={topics}
            savedTopicIds={savedTopicIds}
            toggleFavorite={toggleFavorite}
            likedTopicIds={likedTopicIds}
            toggleLike={toggleLike}
            setSelectedUserName={setSelectedUserName}
            spotlightTopicIds={spotlightTopicIds}
            spotlightTopic={spotlightTopic}
            showToast={showToast}
            showGrowthPrompt={!hasShownHomeGrowthPrompt}
            dismissGrowthPrompt={dismissHomeGrowthPrompt}
            setCircleInitialTopicId={setCircleInitialTopicId}
            onOpenContent={openContentDetail}
          />
        );
      case 'content-detail':
        return selectedContentItem ? (
          <ContentDetailScreen
            item={selectedContentItem}
            setScreen={sS}
            setSelectedUserName={setSelectedUserName}
            likedTopicIds={likedTopicIds}
            toggleLike={toggleLike}
            savedTopicIds={savedTopicIds}
            toggleFavorite={toggleFavorite}
            showToast={showToast}
            setReportType={setReportType}
            setReportTargetName={setReportTargetName}
            setCircleInitialTopicInfo={setCircleInitialTopicInfo}
            spotlightTopic={spotlightTopic}
            isSpotlighted={spotlightTopicIds.has(selectedContentItem.topic.id)}
          />
        ) : (
          <HomeScreen
            setScreen={sS}
            setSelectedTopic={setSelectedTopic}
            topics={topics}
            savedTopicIds={savedTopicIds}
            toggleFavorite={toggleFavorite}
            likedTopicIds={likedTopicIds}
            toggleLike={toggleLike}
            setSelectedUserName={setSelectedUserName}
            spotlightTopicIds={spotlightTopicIds}
            spotlightTopic={spotlightTopic}
            showToast={showToast}
            showGrowthPrompt={!hasShownHomeGrowthPrompt}
            dismissGrowthPrompt={dismissHomeGrowthPrompt}
            setCircleInitialTopicId={setCircleInitialTopicId}
            onOpenContent={openContentDetail}
          />
        );
      case 'topic-detail':
        return selectedTopic ? (
          <TopicDetail
            topic={selectedTopic}
            setScreen={sS}
            prevScreen={prevScreen}
            toggleFavorite={toggleFavorite}
            isFavorite={savedTopicIds.has(selectedTopic.id)}
            toggleLike={toggleLike}
            isLiked={likedTopicIds.has(selectedTopic.id)}
            setSelectedTopic={setSelectedTopic}
            setSelectedUserName={setSelectedUserName}
            showToast={showToast}
            isSpotlighted={spotlightTopicIds.has(selectedTopic.id)}
            spotlightTopic={spotlightTopic}
            userVlogs={userVlogs}
            deleteVlog={deleteVlog}
            setCircleInitialTopicInfo={setCircleInitialTopicInfo}
            setReportTargetName={setReportTargetName}
            setReportType={setReportType}
          />
        ) : (
          <HomeScreen
            setScreen={sS}
            setSelectedTopic={setSelectedTopic}
            topics={topics}
            savedTopicIds={savedTopicIds}
            toggleFavorite={toggleFavorite}
            likedTopicIds={likedTopicIds}
            toggleLike={toggleLike}
            setSelectedUserName={setSelectedUserName}
            spotlightTopicIds={spotlightTopicIds}
            spotlightTopic={spotlightTopic}
            showToast={showToast}
            showGrowthPrompt={!hasShownHomeGrowthPrompt}
            dismissGrowthPrompt={dismissHomeGrowthPrompt}
            setCircleInitialTopicId={setCircleInitialTopicId}
            onOpenContent={openContentDetail}
          />
        );
      case 'create-circle':
        return <CreateCircleScreen setScreen={sS} setSelectedTopic={setSelectedTopic} initialTopicInfo={circleInitialTopicInfo} />;
      case 'album-composer':
        return <AlbumComposer setScreen={sS} showToast={showToast} source={albumComposerSource} topic={selectedTopic || undefined} prevScreen={prevScreen} />;
      case 'create-and-shoot':
        return <CreateAndShootScreen setScreen={sS} showToast={showToast} />;
      case 'create-success':
        return <CreateSuccessScreen setScreen={sS} showToast={showToast} />;
      case 'circle':
        return (
          <CircleScreen
            setScreen={sS}
            prevScreen={prevScreen}
            topics={topics}
            setSelectedTopic={setSelectedTopic}
            setSelectedUserName={setSelectedUserName}
            savedTopicIds={savedTopicIds}
            toggleFavorite={toggleFavorite}
            likedTopicIds={likedTopicIds}
            toggleLike={toggleLike}
            spotlightTopicIds={spotlightTopicIds}
            spotlightTopic={spotlightTopic}
            showToast={showToast}
            diamondBalance={diamondBalance}
            setDiamondBalance={setDiamondBalance}
            initialTopicId={circleInitialTopicId}
            isMyWorkMode={circleIsMyWorkMode}
            setCircleIsMyWorkMode={setCircleIsMyWorkMode}
            setCircleInitialTopicId={setCircleInitialTopicId}
            setCircleInitialTopicInfo={setCircleInitialTopicInfo}
            isGiftDonorDetailModalOpen={isGiftDonorDetailModalOpen}
            setIsGiftDonorDetailModalOpen={setIsGiftDonorDetailModalOpen}
            setCirclePureMode={setIsCirclePureMode}
            setReportTargetName={setReportTargetName}
            setReportType={setReportType}
          />
        );
      case 'feedback':
        return <FeedbackScreen setScreen={sS} />;
      case 'join':
        return selectedTopic ? <JoinScreen topic={selectedTopic} setScreen={sS} showToast={showToast} /> : <div className="flex flex-col items-center justify-center h-full text-white/40"><p>请先选择话题</p><button onClick={() => sS('home')} className="mt-4 px-6 py-2 glass-pill">返回首页</button></div>;
      case 'video-edit':
        return (
          <VideoEditScreen
            topic={selectedTopic || topics[0]}
            setScreen={sS}
            showToast={showToast}
            onPost={handlePostVlog}
            source={(selectedTopic?.creator === CURRENT_USER.name && (prevScreen === 'join' || prevScreen === 'create-and-shoot')) ? 'create' : 'join'}
          />
        );
      case 'join-success':
        return <JoinSuccessScreen setScreen={sS} showToast={showToast} />;
      case 'messages':
        return <MessagesScreen setScreen={sS} />;
      case 'me':
        return (
          <MeScreen
            setScreen={sS}
            profile={profile}
            diamondBalance={diamondBalance}
            energyBalance={energyBalance}
            likedCount={likedTopicIds.size}
            savedCount={savedTopicIds.size}
            worksCount={userVlogs.length}
            setInitialNetworkTab={setInitialNetworkTab}
            setSelectedTopic={setSelectedTopic}
            setCircleIsMyWorkMode={setCircleIsMyWorkMode}
            setCircleInitialTopicId={setCircleInitialTopicId}
          />
        );
      case 'my-works':
        return <MyWorksScreen setScreen={sS} topics={topics} setSelectedTopic={setSelectedTopic} userVlogs={userVlogs} setCircleIsMyWorkMode={setCircleIsMyWorkMode} setCircleInitialTopicId={setCircleInitialTopicId} />;
      case 'smart-ring':
        return <SmartRingScreen setScreen={sS} />;
      case 'shop':
        return <ShopScreen setScreen={sS} balance={energyBalance} />;
      case 'recharge':
        return <RechargeScreen setScreen={sS} balance={diamondBalance} />;
      case 'settings':
        return <SettingsScreen setScreen={sS} />;
      case 'blacklist':
        return <BlacklistScreen setScreen={sS} blockedUserNames={[...blockedUserNames]} unblockUser={unblockUser} />;
      case 'friends':
        return <FriendsScreen setScreen={sS} setSelectedUserName={setSelectedUserName} initialTab={initialNetworkTab} />;
      case 'network-list':
        return <NetworkListScreen setScreen={sS} prevScreen={prevScreen} initialTab={initialNetworkTab} userName={selectedUserName} />;
      case 'liked-topics':
        return <LikedTopicsScreen setScreen={sS} topics={topics} likedTopicIds={likedTopicIds} setSelectedTopic={setSelectedTopic} />;
      case 'saved-topics':
        return <SavedTopicsScreen setScreen={sS} topics={topics} savedTopicIds={savedTopicIds} setSelectedTopic={setSelectedTopic} />;
      case 'dm':
        return (
          <DMScreen
            setScreen={sS}
            setSelectedUserName={setSelectedUserName}
            userName={selectedUserName}
            showToast={showToast}
            userRemarks={userRemarks}
            setUserRemarks={setUserRemarks}
            blockedUserNames={blockedUserNames}
            blockUser={blockUser}
            setReportTargetName={setReportTargetName}
            setReportType={setReportType}
          />
        );
      case 'relation-invite':
        return <RelationInviteScreen setScreen={sS} />;
      case 'relation-sent':
        return <RelationSentScreen setScreen={sS} />;
      case 'relation-review':
        return <RelationReviewScreen setScreen={sS} showToast={showToast} />;
      case 'user-profile':
        return (
          <UserProfileScreen
            setScreen={sS}
            userName={selectedUserName}
            prevScreen={prevScreen}
            showToast={showToast}
            setInitialNetworkTab={setInitialNetworkTab}
            userRemarks={userRemarks}
            setUserRemarks={setUserRemarks}
            blockedUserNames={blockedUserNames}
            blockUser={blockUser}
            setReportTargetName={setReportTargetName}
          />
        );
      case 'report-user':
        return <ReportUserScreen setScreen={sS} targetName={reportTargetName} reportType={reportType} showToast={showToast} />;
      case 'report-success':
        return <ReportSuccessScreen setScreen={sS} targetName={reportTargetName} />;
      case 'personal-profile':
        return <PersonalProfileScreen setScreen={sS} profile={profile} setProfile={setProfile} showToast={showToast} />;
      case 'gift':
        return <GiftScreen setScreen={sS} prevScreen={prevScreen} showToast={showToast} />;
      case 'energy-detail':
        return <EnergyDetailScreen setScreen={sS} prevScreen={prevScreen} balance={energyBalance} />;
      case 'account-profile':
        return <AccountProfileScreen setScreen={sS} />;
      case 'privacy-policy':
        return <PrivacyPolicyScreen setScreen={sS} />;
      case 'notification-settings':
        return <NotificationSettingsScreen setScreen={sS} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-white/40 space-y-4">
            <Settings className="animate-spin-slow" size={48} />
            <p className="font-black uppercase tracking-widest text-sm">功能开发中... ({screen})</p>
            <button onClick={() => sS('home')} className="px-6 py-2 glass-pill rounded-lg text-white">返回首页</button>
          </div>
        );
    }
  };
  const isLightShell = screen === 'login' || screen === 'messages' || screen === 'me';

  return (
    <div className={`max-w-[402px] mx-auto h-[874px] overflow-hidden relative shadow-[0_0_120px_rgba(0,0,0,0.15)] border-[8px] border-[#f5f5f5] rounded-[44px] font-sans my-4 ${
      isLightShell ? 'bg-[#f8f4ed]' : 'bg-dark'
    }`}>
      {/* Simulated Status Bar / Dynamic Island */}
      <div className="absolute top-0 inset-x-0 h-10 z-[100] flex justify-between items-center px-10 pointer-events-none">
        <span className={`text-[13px] font-black tracking-tight mt-3 ${isLightShell ? 'text-[#4f3d2d]' : 'text-white'}`}>9:41</span>
        <div className="w-[110px] h-[30px] bg-dark rounded-full mt-3 shadow-2xl border border-black/5 flex items-center justify-center gap-1.5 overflow-hidden">
           <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.8)]"></div>
           <div className="w-6 h-0.5 bg-white/20 rounded-full"></div>
        </div>
        <div className="flex gap-1.5 items-center mt-3 scale-90">
          <div className={`w-5 h-2.5 rounded-[3px] relative overflow-hidden ring-[1px] ${
            isLightShell ? 'bg-[#ded2c4] ring-[#cdbdab]' : 'bg-dark/20 ring-black/10'
          }`}>
             <div className={`absolute inset-y-0 left-0 w-3/4 ${isLightShell ? 'bg-[#4f3d2d]' : 'bg-dark'}`}></div>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={screen + (selectedTopic?.id || '')}
          initial={{ opacity: 0, scale: screen === 'topic-detail' ? 0.96 : 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: screen === 'topic-detail' ? 1.04 : 0.98 }}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className="h-full relative flex flex-col"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[150] px-6 py-4 bg-black/80 backdrop-blur-md text-white font-bold text-xs shadow-2xl border border-white/10 rounded-full whitespace-nowrap"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCreateMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCreateMenuOpen(false)}
            className="absolute inset-0 z-[120] flex flex-col justify-end bg-black/30 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              onClick={(event) => event.stopPropagation()}
              className="overflow-hidden rounded-t-[28px] bg-white text-center text-[#2f261d] shadow-[0_-18px_44px_rgba(47,38,29,0.16)]"
            >
              <button
                onClick={() => {
                  setAlbumComposerSource('create');
                  setIsCreateMenuOpen(false);
                  handleSetScreen('album-composer');
                }}
                className="flex h-[76px] w-full items-center justify-center border-b border-[#eee4d8] text-[20px] font-bold active:bg-[#f7f3ec]"
              >
                从相册选择
              </button>
              <button
                onClick={() => {
                  setCircleInitialTopicInfo(undefined);
                  setIsCreateMenuOpen(false);
                  handleSetScreen('create-circle');
                }}
                className="flex h-[76px] w-full items-center justify-center border-b border-[#eee4d8] text-[20px] font-bold active:bg-[#f7f3ec]"
              >
                写文字
              </button>
              <div className="h-2 bg-[#f7f3ec]" />
              <button
                onClick={() => setIsCreateMenuOpen(false)}
                className="flex h-[70px] w-full items-center justify-center text-[20px] font-bold active:bg-[#f7f3ec]"
              >
                取消
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {(screen === 'home' || screen === 'circle' || screen === 'messages' || screen === 'me') && !(screen === 'circle' && isCirclePureMode) && (
        <>
          <BottomNav
            active={screen}
            setScreen={handleSetScreen}
            onPlusClick={() => {
              setIsCreateMenuOpen(true);
            }}
          />
        </>
      )}
    </div>
  );
}

// --- Splash Screen ---

const SplashScreen = () => {
  return (
    <div className="flex flex-col h-full bg-dark items-center justify-center relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#FFD700]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#FFD700]/5 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <Logo size={100} className="mb-10" />

        <div className="flex flex-col items-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center space-y-4"
          >
            <h2 className="w-full px-4 text-center text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-normal whitespace-nowrap">让相信真爱的人聚在一起</h2>
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-8 bg-[#D4AF37]/30" />
              <div className="h-[1px] w-8 bg-[#D4AF37]/30" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="mt-12"
          >
            <p className="text-[9px] font-light text-white/20 tracking-[0.4em] uppercase">DR Moments Journal · Premium Edition</p>
          </motion.div>
        </div>
      </div>

      {/* Elegant Progress Indicator */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
            className="w-1.5 h-1.5 rounded-full bg-[#FFD700]"
          />
        ))}
      </div>
    </div>
  );
};

// --- Smart Ring Screen ---

const SmartRingScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  return (
    <div className={lightPageRootPadded}>
      <header className={lightHeaderShell}>
        <button onClick={() => setScreen('me')} className={lightIconButton}>
          <ArrowLeft size={20} />
        </button>
        <h2 className="font-bold text-[#2f261d] text-lg tracking-tight">智能戒指</h2>
        <div className="w-10 h-10"></div>
      </header>

      <main className="flex-1 p-6 space-y-6 overflow-y-auto no-scrollbar pb-12">
        <section className="bg-gradient-to-br from-[#fff7eb] via-white to-[#f6ede3] p-8 rounded-[24px] border border-[#f0dfc0] flex items-center justify-between shadow-xl">
           <div className="space-y-2 relative z-10">
              <p className="text-xs font-black uppercase text-[#b4834a] tracking-widest">DR Ring Pro</p>
              <h3 className="text-6xl font-bold leading-none text-[#2f261d]">86</h3>
              <p className="text-[#8f7f6d] text-xs italic">今日状态良好 · 已佩戴 7.5h</p>
           </div>
           <img src="https://images.unsplash.com/photo-1611078440058-20412803b9b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" alt="Ring" className="w-24 h-24 rounded-full border-[10px] border-gold shadow-[0_0_40px_rgba(214,178,126,0.1)] relative z-10 object-cover" />
        </section>

        <section className="grid grid-cols-3 gap-3">
           {[
             { label: '准备度', val: '86', desc: '稳定', tone: 'red' },
             { label: '睡眠', val: '82', desc: '1h 深睡', tone: 'indigo' },
             { label: '活动', val: '74', desc: '1.8k 步', tone: 'emerald' },
           ].map(item => (
             <div key={item.label} className={`p-4 space-y-2 shadow-lg ${lightSurfaceCard}`}>
                <p className="text-[10px] font-black uppercase text-[#b0a08e] tracking-widest">{item.label}</p>
                <p className="text-xl font-bold text-[#2f261d]">{item.val}</p>
                <p className="text-[10px] text-[#8f7f6d] truncate italic">{item.desc}</p>
             </div>
           ))}
        </section>

        <section className={`p-6 space-y-6 shadow-xl ${lightSurfaceCard}`}>
           <div className="flex justify-between items-center">
              <h4 className="font-bold text-sm text-[#2f261d]">心率趋势 (24h)</h4>
              <span className="text-[10px] font-black text-[#b0a08e] uppercase tracking-widest underline decoration-green-500/30">同步正常</span>
           </div>
           <div className="h-24 flex items-end gap-2 px-1">
              {[40, 60, 45, 80, 55, 70, 50, 65, 40].map((h, i) => (
                <div key={i} className="flex-1 bg-gradient-to-t from-gold/5 via-gold/10 to-gold/40 rounded-t-full" style={{ height: `${h}%` }}></div>
              ))}
           </div>
           <div className="pt-4 border-t border-[#eadfce] flex justify-between">
              <div>
                 <p className="text-[10px] font-black uppercase text-[#b0a08e]">静息心率</p>
                 <p className="text-lg font-bold text-[#2f261d]">62 bpm</p>
              </div>
              <div className="text-right">
                 <p className="text-[10px] font-black uppercase text-[#b0a08e]">HRV 变异率</p>
                 <p className="text-lg font-bold text-[#2f261d]">48 ms</p>
              </div>
           </div>
        </section>

        <div className="p-4 bg-white/82 rounded-[18px] border border-[#eadfce] flex gap-4 items-center shadow-sm">
           <div className="w-10 h-10 bg-[#fff1dc] rounded-lg flex items-center justify-center text-[#b4834a]">
              <Bell size={20} />
           </div>
           <div className="flex-1">
              <p className="text-sm font-bold text-[#2f261d]">今晚建议早点休息</p>
              <p className="text-xs text-[#8f7f6d] mt-0.5 leading-relaxed italic">体温较昨日略高，身体处于恢复期。</p>
           </div>
        </div>
      </main>
    </div>
  );
};

// --- DM (Chat) Screen ---

const DMScreen = ({
  setScreen,
  setSelectedUserName,
  userName,
  showToast,
  userRemarks,
  setUserRemarks,
  blockedUserNames,
  blockUser,
  setReportTargetName,
  setReportType,
}: {
  setScreen: (s: Screen) => void,
  setSelectedUserName: (name: string) => void,
  userName: string,
  showToast: (m: string) => void,
  userRemarks: Record<string, string>,
  setUserRemarks: React.Dispatch<React.SetStateAction<Record<string, string>>>,
  blockedUserNames: Set<string>,
  blockUser: (name: string) => void,
  setReportTargetName: (name: string) => void,
  setReportType: (type: 'account' | 'video') => void,
}) => {
  const [msg, setMsg] = useState('');
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isGiftPanelOpen, setIsGiftPanelOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isFollowed, setIsFollowed] = useState(true);
  const [isRemarkOpen, setIsRemarkOpen] = useState(false);
  const [remarkDraft, setRemarkDraft] = useState(userRemarks[userName] || '');
  const [isBlockConfirmOpen, setIsBlockConfirmOpen] = useState(false);
  const emojis = ['😀', '😂', '😍', '🥰', '👍', '🔥', '🎁', '💎', '❤️', '👏', '😎', '😭'];
  const remarkName = userRemarks[userName];
  const isBlocked = blockedUserNames.has(userName);
  const [messages, setMessages] = useState([
    { id: 1, text: '我刚拍了一段 3 秒片段，顺手把声音也录进去了。', sender: 'other', time: '09:41' },
    { id: 2, text: '我这边也补好了，今天的城市声音很完整。', sender: 'me', time: '09:42' },
  ]);

  const handleSend = () => {
    if (!msg.trim()) return;
    const newMsg = {
      id: Date.now(),
      text: msg,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMsg]);
    setMsg('');
    setIsEmojiOpen(false);
  };

  const handleImageSend = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: '图片',
        image: event.target?.result as string,
        sender: 'me',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const sendVoiceMessage = () => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      text: '语音 0:08',
      voice: true,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  const finishRecording = () => {
    if (!isRecording) return;
    setIsRecording(false);
    sendVoiceMessage();
  };

  const addEmoji = (emoji: string) => {
    setIsVoiceMode(false);
    setMsg(prev => `${prev}${emoji}`);
  };
  const saveRemark = () => {
    const nextRemark = remarkDraft.trim();
    setUserRemarks(prev => {
      const next = { ...prev };
      if (nextRemark) next[userName] = nextRemark;
      else delete next[userName];
      return next;
    });
    setIsRemarkOpen(false);
    showToast(nextRemark ? '备注已保存' : '备注已清除');
  };
  const handleFollowToggle = () => {
    setIsFollowed(prev => {
      const next = !prev;
      showToast(next ? '已关注' : '已取消关注');
      return next;
    });
    setIsMoreOpen(false);
  };
  const handleReport = () => {
    setReportType('account');
    setReportTargetName(userName);
    setIsMoreOpen(false);
    setScreen('report-user');
  };
  const handleBlock = () => {
    blockUser(userName);
    setIsBlockConfirmOpen(false);
    setIsMoreOpen(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#f7f7f7] pt-8 text-[#161616] relative overflow-hidden">
      <header className="px-5 py-4 flex items-center justify-between sticky top-0 bg-[#f7f7f7]/96 backdrop-blur-xl z-20">
        <button onClick={() => setScreen('messages')} className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-[#161616] shadow-sm active:scale-95 transition-transform">
          <ArrowLeft size={20} />
        </button>
        <div className="text-center group active:scale-95 transition-transform cursor-pointer" onClick={() => {
            setSelectedUserName(userName);
            setScreen('user-profile');
        }}>
           <h2 className="font-black text-[#161616] text-base">{remarkName || userName}</h2>
        </div>
        <button onClick={() => setIsMoreOpen(true)} className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-[#161616] shadow-sm active:scale-95 transition-transform" aria-label="聊天更多操作">
          <MoreHorizontal size={20} />
        </button>
      </header>

      <main className="flex-1 px-4 pt-3 space-y-5 overflow-y-auto no-scrollbar pb-28 bg-[#f7f7f7]">
         <div className="flex justify-center">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold text-[#a1a1a1]">09:41</span>
         </div>

         {messages.map((m) => (
           <div key={m.id} className={`flex gap-2.5 ${m.sender === 'me' ? 'flex-row-reverse' : 'flex-row'} max-w-full animate-in fade-in slide-in-from-bottom-2`}>
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${m.sender === 'me' ? 'Dear6317B6SG' : userName}`} alt="" className="w-9 h-9 rounded-full bg-white shrink-0 object-cover" />
              <div className={`max-w-[72%] px-3.5 py-2.5 shadow-sm space-y-1.5 ${
                m.sender === 'me'
                ? 'bg-[#FE2C55] rounded-[14px] rounded-tr-[4px] text-white'
                : 'bg-white rounded-[14px] rounded-tl-[4px] text-[#161616]'
              }`}>
                 {(m as any).image ? (
                   <img src={(m as any).image} alt="发送的图片" className="max-w-[180px] rounded-xl object-cover" />
                 ) : (m as any).voice ? (
                   <div className="flex items-center gap-2 min-w-[120px]">
                     <Mic size={15} />
                     <span className="text-xs font-black">{m.text}</span>
                   </div>
                 ) : (
                   <p className="text-[14px] leading-relaxed font-medium">{m.text}</p>
                 )}
                 <span className={`text-[9px] font-bold block text-right ${m.sender === 'me' ? 'text-white/65' : 'text-[#b8b8b8]'}`}>
                   {m.time}
                 </span>
              </div>
           </div>
         ))}

         <div className="mx-auto w-full rounded-[14px] bg-white px-4 py-3 shadow-sm flex items-center justify-between gap-3">
            <div className="min-w-0">
               <p className="text-[11px] font-black text-[#FE2C55]">共创动态</p>
               <h4 className="mt-0.5 text-sm font-black text-[#161616] truncate">今天的城市声音</h4>
            </div>
            <button onClick={() => setScreen('topic-detail')} className="h-8 px-3 bg-[#f5f5f5] text-[#161616] font-black text-[10px] rounded-full shrink-0">
               查看
            </button>
         </div>


      </main>

      <div className="absolute inset-x-0 bottom-0 z-50 bg-[#f7f7f7]/96 backdrop-blur-xl px-3 pt-2 pb-6">
         <div className="rounded-[20px] bg-white px-2 pb-2 pt-2 shadow-[0_8px_28px_rgba(0,0,0,0.08)]">
           <div className="flex h-11 items-center gap-2">
            {isVoiceMode ? (
              <button
                onPointerDown={() => setIsRecording(true)}
                onPointerUp={finishRecording}
                onPointerLeave={() => setIsRecording(false)}
                className={`flex-1 h-9 rounded-full text-sm font-black transition-all ${isRecording ? 'bg-[#FE2C55] text-white scale-[0.98]' : 'bg-[#f4f4f4] text-[#161616]'}`}
              >
                {isRecording ? '松开发送' : '按住说话'}
              </button>
            ) : (
              <input
                className="flex-1 bg-[#f4f4f4] h-9 rounded-full px-4 text-sm font-medium placeholder:text-[#a5a5a5] outline-none text-[#161616]"
                placeholder={`想对${remarkName || userName}说点什么...`}
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
            )}
            <button
              onClick={handleSend}
              disabled={!msg.trim()}
              className={`h-9 min-w-[58px] px-4 font-black rounded-full text-xs whitespace-nowrap transition-all ${
                msg.trim() ? 'bg-[#FE2C55] text-white' : 'bg-[#efefef] text-[#b7b7b7]'
              }`}
            >
               发送
            </button>
           </div>

           <div className="mt-2 flex items-center justify-around border-t border-[#f1eee9] pt-2">
             {[
               { label: isVoiceMode ? '键盘' : '语音', icon: Mic, active: isVoiceMode, action: () => { setIsVoiceMode(prev => !prev); setIsEmojiOpen(false); setIsGiftPanelOpen(false); } },
               { label: '表情', icon: Smile, active: isEmojiOpen, action: () => { setIsEmojiOpen(prev => !prev); setIsVoiceMode(false); setIsGiftPanelOpen(false); } },
               { label: '图片', icon: ImageIcon, active: false, action: undefined },
               { label: '礼物', icon: Gift, active: isGiftPanelOpen, action: () => { setIsGiftPanelOpen(prev => !prev); setIsEmojiOpen(false); setIsVoiceMode(false); } },
             ].map((tool) => (
               tool.label === '图片' ? (
                 <label key={tool.label} className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-[#7d6f61] active:scale-90 transition-transform" aria-label={tool.label}>
                   <tool.icon size={22} strokeWidth={2.3} />
                   <input type="file" accept="image/*" className="hidden" onChange={handleImageSend} />
                 </label>
               ) : (
                 <button
                   key={tool.label}
                   onClick={tool.action}
                   aria-label={tool.label}
                   className={`flex h-10 w-10 items-center justify-center rounded-full active:scale-90 transition-all ${
                     tool.active ? 'bg-[#2f261d]/8 text-[#2f261d]' : 'text-[#7d6f61]'
                   }`}
                 >
                   <tool.icon size={22} strokeWidth={2.3} />
                 </button>
               )
             ))}
           </div>
         </div>
         {isEmojiOpen && (
           <div className="mt-2 rounded-[16px] bg-white p-3 shadow-[0_8px_28px_rgba(0,0,0,0.08)] grid grid-cols-6 gap-2">
             {emojis.map((emoji) => (
               <button
                 key={emoji}
                 onClick={() => addEmoji(emoji)}
                 className="h-10 rounded-xl bg-[#f7f7f7] text-xl active:scale-95 transition-transform"
               >
                 {emoji}
               </button>
             ))}
           </div>
         )}
         {isGiftPanelOpen && (
           <div className="mt-2 grid grid-cols-4 gap-2 rounded-[16px] bg-white p-3 shadow-[0_8px_28px_rgba(0,0,0,0.08)]">
             {GIFTS.slice(0, 4).map((gift) => (
               <button
                 key={gift.name}
                 onClick={() => {
                   setMessages(prev => [...prev, {
                     id: Date.now(),
                     text: `送出 ${gift.name}`,
                     sender: 'me',
                     time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                   }]);
                   setIsGiftPanelOpen(false);
                   showToast(`已送出${gift.name}`);
                 }}
                 className="rounded-xl bg-[#fffaf4] px-2 py-3 text-center active:scale-95 transition-transform"
               >
                 <span className="block text-2xl leading-none">{gift.icon}</span>
                 <span className="mt-1 block truncate text-[9px] font-black text-[#2f261d]">{gift.name}</span>
               </button>
             ))}
           </div>
         )}
      </div>

      <AnimatePresence>
        {isMoreOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[80] flex flex-col justify-end bg-black/28 backdrop-blur-sm"
            onClick={() => setIsMoreOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 260 }}
              className="rounded-t-[32px] bg-[#fffaf5] px-5 pb-8 pt-3 shadow-[0_-18px_50px_rgba(73,55,39,0.16)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-[#eadfce]" />
              <div className="mb-4 flex items-center gap-3">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} alt="" className="h-11 w-11 rounded-xl bg-[#f6ede3]" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-black text-[#2f261d]">{remarkName || userName}</p>
                  {remarkName && <p className="text-[10px] font-black uppercase tracking-widest text-[#a79584]">原名 {userName}</p>}
                </div>
              </div>
              {[
                { label: '设置备注', icon: Pencil, action: () => { setIsMoreOpen(false); setRemarkDraft(userRemarks[userName] || ''); setIsRemarkOpen(true); } },
                { label: isFollowed ? '取消关注' : '关注', icon: UserPlus, action: handleFollowToggle },
                { label: '举报', icon: AlertTriangle, action: handleReport, danger: true },
                { label: '拉黑', icon: Lock, action: () => setIsBlockConfirmOpen(true), danger: true },
              ].map(item => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className={`flex w-full items-center gap-3 rounded-[16px] px-4 py-3.5 text-left active:bg-[#f6ede3] transition-colors ${
                    item.danger ? 'text-rose-500' : 'text-[#2f261d]'
                  }`}
                >
                  <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${item.danger ? 'bg-rose-50' : 'bg-[#f6ede3]'}`}>
                    <item.icon size={17} />
                  </span>
                  <span className="text-sm font-black">{item.label}</span>
                </button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isRemarkOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[85] flex items-center justify-center bg-black/30 px-6 backdrop-blur-sm"
            onClick={() => setIsRemarkOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 12 }}
              className="w-full rounded-[20px] bg-[#fffaf5] p-5 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-black text-[#2f261d]">设置备注</h3>
              <p className="mt-1 text-xs font-bold text-[#8f7f6d]">给 {userName} 一个你更容易识别的名字。</p>
              <input
                value={remarkDraft}
                onChange={(e) => setRemarkDraft(e.target.value)}
                maxLength={16}
                placeholder="输入备注名"
                className="mt-5 h-12 w-full rounded-xl bg-[#f8f1e8] px-4 text-sm font-black text-[#2f261d] outline-none"
              />
              <div className="mt-5 grid grid-cols-2 gap-3">
                <button onClick={() => setIsRemarkOpen(false)} className="h-11 rounded-xl bg-white text-sm font-black text-[#8f7f6d] shadow-sm active:scale-95 transition-transform">取消</button>
                <button onClick={saveRemark} className="h-11 rounded-xl bg-[#2f261d] text-sm font-black text-white active:scale-95 transition-transform">保存</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isBlockConfirmOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[90] flex items-end bg-black/32 backdrop-blur-sm"
            onClick={() => setIsBlockConfirmOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="w-full rounded-t-[32px] bg-[#fffaf5] px-6 pb-8 pt-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 text-rose-500">
                <AlertTriangle size={26} />
              </div>
              <h3 className="text-center text-xl font-black text-[#2f261d]">确认拉黑 {remarkName || userName}？</h3>
              <p className="mx-auto mt-3 max-w-[280px] text-center text-xs font-bold leading-relaxed text-[#8f7f6d]">
                拉黑后，对方将无法与你私信互动，也会进入设置中的黑名单列表。
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button onClick={() => setIsBlockConfirmOpen(false)} className="h-12 rounded-xl bg-white text-sm font-black text-[#8f7f6d] shadow-sm active:scale-95 transition-transform">再想想</button>
                <button onClick={handleBlock} className="h-12 rounded-xl bg-rose-500 text-sm font-black text-white active:scale-95 transition-transform">确认拉黑</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Shop Screen ---

const ShopScreen = ({ setScreen, balance }: { setScreen: (s: Screen) => void, balance: number }) => {
  return (
    <div className={lightPageRootPadded}>
      <header className={lightHeaderShell}>
        <button onClick={() => setScreen('me')} className={lightIconButton}>
          <ArrowLeft size={20} />
        </button>
        <h2 className="font-bold text-[#2f261d] text-lg tracking-tight">DR商城</h2>
        <div className="w-10 h-10"></div>
      </header>

      <main className="flex-1 p-6 space-y-6 overflow-y-auto no-scrollbar pb-24">
        <section className="p-8 bg-gradient-to-br from-white via-[#fffaf3] to-[#f6ede3] rounded-[24px] border border-[#eadfce] space-y-3 relative overflow-hidden shadow-xl">
           <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 blur-3xl -mr-16 -mt-16"></div>
           <p className="text-xs font-black uppercase text-indigo-500 tracking-widest relative z-10">我的积分余额</p>
           <h1 className="text-6xl font-bold relative z-10 text-[#2f261d]">{balance.toLocaleString()}</h1>
           <p className="text-[#8f7f6d] text-xs relative z-10 leading-relaxed italic">
             积分由共创礼物及动态获得，仅限商城内实物或虚拟权益兑换。
           </p>
        </section>

        <div className="grid grid-cols-2 gap-4">
           {SHOP_ITEMS.map(item => (
              <div key={item.name} className={`p-4 space-y-4 shadow-lg group active:scale-95 transition-transform ${lightSurfaceCard}`}>
                 <div className="aspect-square rounded-xl bg-[#f6ede3] flex items-center justify-center group-hover:bg-indigo-50 transition-colors overflow-hidden">
                    <img src={`https://images.unsplash.com/photo-${item.price === '680' ? '1542291026-7eec264c27ff' : item.price === '320' ? '1610421255869-7c1bd36122d7' : item.price === '880' ? '1505740420928-5e560c06d30e' : '1523275335684-37898b6baf30'}?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80`} alt={item.name} className="w-full h-full object-cover mix-blend-overlay opacity-80 group-hover:opacity-100 transition-opacity" />
                 </div>
                 <div>
                    <h4 className="font-bold text-sm text-[#2f261d]">{item.name}</h4>
                    <p className="text-[#b4834a] text-lg font-bold mt-1">{item.price}<span className="text-[10px] text-[#b0a08e] ml-1 uppercase font-black">{item.unit}</span></p>
                 </div>
                 <button className="w-full h-10 bg-white border border-[#eadfce] rounded-lg text-[10px] font-black uppercase text-[#8f7f6d] hover:text-[#2f261d] transition-all">
                    立即兑换
                 </button>
              </div>
           ))}
        </div>
      </main>
    </div>
  );
};

// --- Recharge Screen ---

const RechargeScreen = ({ setScreen, balance }: { setScreen: (s: Screen) => void, balance: number }) => {
  return (
    <div className={lightPageRootPadded}>
      <header className={lightHeaderShell}>
        <button onClick={() => setScreen('me')} className={lightIconButton}>
          <ArrowLeft size={20} />
        </button>
        <h2 className="font-bold text-[#2f261d] text-lg tracking-tight">钻石充值</h2>
        <div className="w-10 h-10"></div>
      </header>

      <main className="flex-1 p-6 space-y-8 overflow-y-auto no-scrollbar pb-24">
        <div className="space-y-3">
           <p className="text-xs font-black text-[#8f7f6d] tracking-widest uppercase">账户可用余额</p>
           <h1 className="text-6xl font-bold flex items-center gap-4 text-[#2f261d]">
              {balance.toLocaleString()}
              <div className="w-10 h-10 bg-[#fff1dc] border border-[#f0dfc0] rounded-lg flex items-center justify-center rotate-45 shadow-lg"></div>
           </h1>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { amount: '68', label: '6 钻石', price: '6.00' },
            { amount: '128', label: '12+1 钻石', price: '12.00', bonus: true },
            { amount: '328', label: '32+5 钻石', price: '32.00', bonus: true },
            { amount: '648', label: '64+12 钻石', price: '64.00', bonus: true },
          ].map(opt => (
            <div key={opt.amount} className={`p-6 rounded-[24px] border active:scale-95 transition-all cursor-pointer shadow-lg ${opt.bonus ? 'bg-[#fff7eb] border-[#f0dfc0]' : 'bg-white/82 border-[#eadfce]'}`}>
               <p className={`text-sm font-bold ${opt.bonus ? 'text-[#b4834a]' : 'text-[#8f7f6d]'}`}>{opt.label}</p>
               <h3 className="text-3xl font-bold mt-2 text-[#2f261d]">{opt.price}</h3>
               {opt.bonus && <span className="inline-block mt-4 px-2 py-0.5 bg-gold text-dark text-[8px] font-black rounded uppercase">赠送礼包</span>}
            </div>
          ))}
        </div>

        <div className="p-6 bg-white/82 rounded-[24px] border border-[#eadfce] space-y-4 shadow-sm">
           <h4 className="font-bold text-sm text-[#2f261d]">充值说明</h4>
           <p className="text-xs text-[#8f7f6d] leading-relaxed italic">
             钻石是 DR圈内的通用货币，可用于礼物赠送、道具购买等。一旦充值暂不支持退款，请理性参与共创。
           </p>
        </div>
      </main>
    </div>
  );
};

// --- Relation Invite Screen ---

// --- Relation Invite Screen ---

const RelationInviteScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  const [selectedType, setSelectedType] = useState('真爱');
  const [targetId, setTargetId] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const relations = [
    { title: '真爱', desc: '一对一专属关系，永不落幕', color: '#f43f5e', icon: Heart, badge: 'Soulmate' },
    { title: '闺蜜', desc: '亲密无间的挚友（最多 3 个）', color: '#6366f1', icon: Sparkles, badge: 'BFF' },
    { title: '兄弟', desc: '肝胆相照的兄弟（最多 3 个）', color: '#10b981', icon: Zap, badge: 'Brother' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#050505] overflow-hidden relative">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] opacity-30 blur-[120px] bg-gradient-to-br from-rose-500/20 via-indigo-500/10 to-transparent"></div>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      </div>

      <header className="p-6 flex items-center justify-between relative z-20">
        <button onClick={() => setScreen('me')} className="w-12 h-12 glass-pill rounded-xl flex items-center justify-center border border-white/5 active:scale-90 transition-transform">
          <ArrowLeft size={20} className="text-white" />
        </button>
        <div className="text-center">
          <h2 className="font-bold text-white tracking-widest uppercase text-xs">星轨绑定</h2>
          <div className="h-0.5 w-4 bg-gold mx-auto mt-1 rounded-full opacity-50"></div>
        </div>
        <button className="w-12 h-12 glass-pill rounded-xl flex items-center justify-center border border-white/5 opacity-50">
          <HelpCircle size={20} className="text-white" />
        </button>
      </header>

      <main className="flex-1 p-6 space-y-10 overflow-y-auto no-scrollbar relative z-10">
        {/* Connection Ritual Header */}
        <section className="text-center space-y-4 pt-4">
          <div className="relative inline-block">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-20px] border border-dashed border-white/10 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-10px] border border-dashed border-gold/20 rounded-full"
            />
            <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 p-1 relative z-10 flex items-center justify-center overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Wesley" className="w-full h-full object-cover rounded-full" alt="Me" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent"></div>
            </div>
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 60, opacity: 1 }}
              className="absolute top-1/2 -right-8 flex gap-1 items-center"
            >
              {[1, 2, 3].map(i => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                  transition={{ delay: i * 0.2, duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_8px_gold]"
                />
              ))}
            </motion.div>
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-white italic tracking-tight">开启关系共鸣</h1>
            <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">The Stellar Alignment Ritual</p>
          </div>
        </section>

        {/* Relation Selector */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h4 className="text-[10px] font-black uppercase text-white/30 tracking-widest">选择共鸣类型</h4>
            <span className="text-[10px] font-black text-gold/40 italic">Select Frequency</span>
          </div>

          <div className="flex gap-4 overflow-x-auto no-scrollbar py-2 -mx-6 px-6">
            {relations.map(item => (
              <motion.div
                key={item.title}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedType(item.title)}
                className={`relative min-w-[140px] aspect-[4/5] p-5 rounded-[24px] border transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer ${
                  selectedType === item.title
                  ? 'bg-white/10 border-white/20'
                  : 'bg-white/5 border-white/5'
                }`}
              >
                {selectedType === item.title && (
                  <motion.div
                    layoutId="rel-bg"
                    className="absolute inset-0 opacity-20"
                    style={{ backgroundColor: item.color, filter: 'blur(40px)' }}
                  />
                )}

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-white/30">{item.badge}</span>
                    <h4 className={`font-black text-lg transition-colors ${selectedType === item.title ? 'text-white' : 'text-white/40'}`}>{item.title}</h4>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      selectedType === item.title
                      ? 'bg-white text-dark scale-110 shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                      : 'bg-white/5 text-white/20'
                    }`}>
                      <item.icon size={20} fill={selectedType === item.title ? "currentColor" : "none"} />
                    </div>
                    <p className={`text-[9px] font-medium leading-tight h-8 flex items-end transition-opacity ${selectedType === item.title ? 'opacity-60' : 'opacity-0'}`}>
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Animated Ring if selected */}
                {selectedType === item.title && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.15, scale: 1.5 }}
                    className="absolute bottom-[-20%] right-[-20%] w-32 h-32 border border-white rounded-full"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Target ID Input */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h4 className="text-[10px] font-black uppercase text-white/30 tracking-widest uppercase">定位共鸣坐标</h4>
            <span className="text-[10px] font-black text-gold/40 italic">Target DR ID</span>
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-5 flex items-center text-white/20">
              <Search size={18} />
            </div>
            <input
              value={targetId}
              onChange={(e) => {
                setTargetId(e.target.value);
                if (e.target.value.length > 5) {
                  setIsSearching(true);
                  setTimeout(() => setIsSearching(false), 800);
                }
              }}
              className="w-full h-16 bg-white/5 rounded-[18px] pl-14 pr-14 font-bold border border-white/5 focus:border-white/20 focus:bg-white/10 transition-all outline-none text-white tracking-widest placeholder:text-white/10"
              placeholder="ENTER DR ID..."
            />
            <div className="absolute inset-y-0 right-5 flex items-center">
              {isSearching ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-gold border-t-transparent rounded-full"
                />
              ) : targetId.length > 0 && (
                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-400">
                  <Check size={14} strokeWidth={3} />
                </div>
              )}
            </div>
          </div>
          {targetId.length > 5 && !isSearching && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5"
            >
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${targetId}`} className="w-10 h-10 rounded-lg bg-white/5" alt="Found" />
              <div>
                <p className="text-xs font-bold text-white">找到匹配用户: <span className="text-gold italic">@{targetId}</span></p>
                <p className="text-[9px] font-black text-white/30 uppercase mt-0.5 tracking-wider">Signals Match - Frequency Stabilized</p>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <footer className="p-8 pt-0 relative z-20">
         <button
           onClick={() => setScreen('relation-sent')}
           disabled={!targetId}
           className="w-full h-16 group relative overflow-hidden rounded-[18px] disabled:opacity-30 transition-all active:scale-95"
         >
            <div className="absolute inset-0 bg-white group-hover:bg-gold transition-colors duration-500"></div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_center,white_0%,transparent_70%)]"></div>

            <div className="relative z-10 flex items-center justify-center gap-3 text-dark">
              <div className="flex flex-col items-center">
                <span className="text-xs font-black uppercase tracking-[0.2em] leading-none mb-1">Star Trail Ring</span>
                <span className="text-[10px] font-black italic opacity-60">购买「星轨戒指」并发送</span>
              </div>
              <ChevronRight size={18} strokeWidth={3} />
            </div>

            {/* Shimmer Effect */}
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12"
            />
         </button>

         <p className="text-center mt-6 text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">
           Consumed 520 Diamonds for the Ritual
         </p>
      </footer>
    </div>
  );
};

// --- Relation Sent Screen ---

const RelationSentScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#050505] px-10 text-center relative overflow-hidden">
      {/* Background Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0], y: -500 - Math.random() * 500 }}
          transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 5 }}
          className="absolute w-0.5 h-0.5 bg-white rounded-full bg-gold"
          style={{
            left: `${Math.random() * 100}%`,
            top: '110%'
          }}
        />
      ))}

      <div className="relative mb-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-40px] border border-dashed border-gold/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-20px] border border-dashed border-white/10 rounded-full"
        />

        <motion.div
          initial={{ scale: 0, scaleY: 0.5 }}
          animate={{ scale: 1, scaleY: 1 }}
          transition={{ type: "spring", damping: 12 }}
          className="w-32 h-32 bg-white rounded-[30px] flex items-center justify-center shadow-[0_0_80px_rgba(255,255,255,0.15)] relative z-10 group"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles size={56} className="text-dark" strokeWidth={2.5} />
          </motion.div>

          <motion.div
             animate={{ height: ['0%', '100%', '0%'], opacity: [0, 0.5, 0] }}
             transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
             className="absolute inset-0 w-full rounded-[30px] bg-gold"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-4"
      >
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-white italic tracking-tight">星讯已发出!</h2>
          <p className="text-[10px] font-black uppercase text-gold/40 tracking-[0.4em]">Signal Transmitted Successfully</p>
        </div>
        <p className="text-white/40 text-xs leading-relaxed italic max-w-[240px] mx-auto">
          你的「星轨戒指」已穿透时空。当对方在频率中捕捉到你，专属共鸣标记将永久闪烁在你们的数字星系中。
        </p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={() => setScreen('home')}
        className="w-full mt-12 group h-16 bg-white/5 border border-white/10 rounded-[20px] relative overflow-hidden flex items-center justify-center active:scale-95 transition-all"
      >
        <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500"></div>
        <span className="relative z-10 font-black text-xs uppercase tracking-widest text-white group-hover:text-dark transition-colors">回到现实世界</span>
      </motion.button>
    </div>
  );
};

// --- User Profile Screen (Public) ---
const UserProfileScreen = ({
  setScreen,
  userName,
  prevScreen,
  showToast,
  setInitialNetworkTab,
  userRemarks,
  setUserRemarks,
  blockedUserNames,
  blockUser,
  setReportTargetName,
}: {
  setScreen: (s: Screen) => void,
  userName: string,
  prevScreen: Screen,
  showToast: (m: string) => void,
  setInitialNetworkTab: (tab: 'followers' | 'following' | 'friends') => void,
  userRemarks: Record<string, string>,
  setUserRemarks: React.Dispatch<React.SetStateAction<Record<string, string>>>,
  blockedUserNames: Set<string>,
  blockUser: (name: string) => void,
  setReportTargetName: (name: string) => void,
}) => {
  const [isFollowed, setIsFollowed] = useState(true);
  const [filter, setFilter] = useState('全部');
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isBlockConfirmOpen, setIsBlockConfirmOpen] = useState(false);
  const [isRemarkOpen, setIsRemarkOpen] = useState(false);
  const [remarkDraft, setRemarkDraft] = useState(userRemarks[userName] || '');

  const filterOptions = ['全部', '我发起的', '参与共创', '待成圈'];

  const allWorks = [
    { id: 1, type: '发起', status: '已成圈' },
    { id: 2, type: '发起', status: '待成圈' },
    { id: 3, type: '参与', status: '已成圈' },
    { id: 4, type: '参与', status: '待成圈' },
    { id: 5, type: '参与', status: '已成圈' },
    { id: 6, type: '发起', status: '已成圈' },
  ];

  const getDisplayStatus = (work: { type: string; status: string }) => {
    if (work.type === '发起') return '我发起的';
    if (work.status === '待成圈') return '待成圈';
    return '参与共创';
  };

  const filteredWorks = allWorks.filter(w => {
    if (filter === '全部') return true;
    if (filter === '我发起的') return w.type === '发起';
    if (filter === '参与共创') return w.type === '参与' && w.status === '已成圈';
    if (filter === '待成圈') return w.status === '待成圈';
    return true;
  });
  const publicProfile = {
    description: '喜欢收集城市角落里的声音和短暂的光，也愿意把日常交给一群人共同完成。',
    gender: userName === 'Mia' ? '女' : '',
    birthday: userName === 'Mia' ? '1999-10-08' : '',
  };
  const getAge = (birthday: string) => {
    if (!birthday) return '';
    const birth = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDelta = today.getMonth() - birth.getMonth();
    if (monthDelta < 0 || (monthDelta === 0 && today.getDate() < birth.getDate())) age -= 1;
    return `${age} 岁`;
  };
  const getZodiac = (birthday: string) => {
    if (!birthday) return '';
    const [, monthText, dayText] = birthday.split('-');
    const month = Number(monthText);
    const day = Number(dayText);
    const signs = [
      ['摩羯座', 20], ['水瓶座', 19], ['双鱼座', 21], ['白羊座', 20],
      ['金牛座', 21], ['双子座', 22], ['巨蟹座', 23], ['狮子座', 23],
      ['处女座', 23], ['天秤座', 24], ['天蝎座', 23], ['射手座', 22], ['摩羯座', 32],
    ];
    return day < Number(signs[month - 1][1]) ? String(signs[month - 1][0]) : String(signs[month][0]);
  };
  const profileFacts = [
    publicProfile.gender ? { label: '性别', value: publicProfile.gender } : null,
    publicProfile.birthday ? { label: '星座', value: getZodiac(publicProfile.birthday) } : null,
    publicProfile.birthday ? { label: '年龄', value: getAge(publicProfile.birthday) } : null,
  ].filter(Boolean) as Array<{ label: string; value: string }>;
  const userCode = `${Math.abs([...userName].reduce((sum, char) => sum + char.charCodeAt(0), 0) * 73).toString(36).toUpperCase()}B6SG`;
  const displayName = `迪儿${userCode}`;
  const displayId = `@dear${userCode}`;
  const ipLocation = getUserIpLocation(userName);
  const remarkName = userRemarks[userName];
  const isBlocked = blockedUserNames.has(userName);
  const closeMore = () => setIsMoreOpen(false);

  const saveRemark = () => {
    const nextRemark = remarkDraft.trim();
    setUserRemarks(prev => {
      const next = { ...prev };
      if (nextRemark) next[userName] = nextRemark;
      else delete next[userName];
      return next;
    });
    setIsRemarkOpen(false);
    showToast(nextRemark ? '备注已保存' : '备注已清除');
  };

  const handleUnfollow = () => {
    setIsFollowed(false);
    closeMore();
    showToast('已取消关注');
  };

  const handleFollowToggleFromMenu = () => {
    setIsFollowed(prev => {
      const next = !prev;
      showToast(next ? '已关注' : '已取消关注');
      return next;
    });
    closeMore();
  };

  const handleReport = () => {
    setReportTargetName(userName);
    closeMore();
    setScreen('report-user');
  };

  const handleBlock = () => {
    blockUser(userName);
    setIsBlockConfirmOpen(false);
    closeMore();
  };

  return (
    <div className="flex flex-col h-full bg-[radial-gradient(circle_at_top,#fffaf4_0%,#f7f2ea_42%,#f2ebe1_100%)] pt-8 text-[#2f261d]">
      <header className="p-6 flex items-center justify-between sticky top-0 bg-[#f9f5ef]/90 backdrop-blur-xl z-20">
        <button onClick={() => setScreen(prevScreen)} className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/82 text-[#4f3d2d] shadow-sm active:scale-95 transition-transform">
          <ArrowLeft size={20} />
        </button>
        <h2 className="font-bold text-[#2f261d] text-lg tracking-tight">用户详情</h2>
        <button onClick={() => setIsMoreOpen(true)} className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/82 text-[#4f3d2d] shadow-sm active:scale-95 transition-transform" aria-label="更多操作">
          <MoreHorizontal size={20} />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar px-4 pb-32">
        <section className="mt-2 px-2 py-4">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${displayId}`} alt="" className="w-[78px] h-[78px] rounded-full object-cover shadow-[0_10px_22px_rgba(73,55,39,0.12)]" />
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#fff6e9] rounded-full shadow-sm flex items-center justify-center text-[#b4834a]">
                <ShieldCheck size={14} strokeWidth={3} />
              </div>
            </div>

            <div className="flex-1 min-w-0 text-left">
              <h1 className="text-[24px] font-black text-[#2f261d] tracking-tight leading-tight">{remarkName || displayName}</h1>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                <p className="text-[#7d6f61]">{displayId}</p>
                {remarkName && <span className="text-[11px] font-bold text-[#b0a08e]">原名：{displayName}</span>}
                <span className="text-[11px] font-bold text-[#b0a08e]">IP：{ipLocation}</span>
                {isBlocked && <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-black text-rose-500">已拉黑</span>}
              </div>
              <p className="mt-2.5 text-[#8f7f6d] text-sm leading-relaxed">{publicProfile.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-6">
            <button
              onClick={() => { setInitialNetworkTab('followers'); setScreen('network-list'); }}
              className="text-center active:scale-95 transition-transform"
            >
              <p className="text-[20px] font-black text-[#2f261d]">1.2k</p>
              <p className="text-[10px] text-[#a79584] font-bold">粉丝</p>
            </button>
            <div className="text-center">
              <p className="text-[20px] font-black text-[#2f261d]">86</p>
              <p className="text-[10px] text-[#a79584] font-bold">共创</p>
            </div>
            <button
              onClick={() => { setInitialNetworkTab('following'); setScreen('network-list'); }}
              className="text-center active:scale-95 transition-transform"
            >
              <p className="text-[20px] font-black text-[#2f261d]">14w</p>
              <p className="text-[10px] text-[#a79584] font-bold">获赞</p>
            </button>
          </div>

          {profileFacts.length > 0 && (
            <div className={`grid gap-2 mt-5 ${profileFacts.length === 1 ? 'grid-cols-1' : profileFacts.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
              {profileFacts.map(item => (
                <div key={item.label} className="rounded-[14px] bg-white/58 px-3 py-3 text-center shadow-sm">
                  <p className="text-[10px] font-black text-[#a79584]">{item.label}</p>
                  <p className="mt-1 text-sm font-black text-[#2f261d]">{item.value}</p>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2.5 mt-5">
            <button
              onClick={() => {
                setIsFollowed(!isFollowed);
                if (!isFollowed) showToast('已关注');
              }}
              disabled={isBlocked}
              className={`flex-1 h-12 rounded-[14px] font-black text-xs transition-all flex items-center justify-center gap-2 active:scale-95 ${
                isBlocked
                ? 'bg-white/46 text-[#c2b4a4] shadow-sm'
                :
                isFollowed
                ? 'bg-white/70 text-[#8f7f6d] shadow-sm'
                : 'bg-[#2f261d] text-white shadow-[0_14px_28px_rgba(47,38,29,0.14)]'
              }`}
            >
              {isBlocked ? '已拉黑' : isFollowed ? '已关注' : '关注 TA'}
            </button>
            <button
              onClick={() => setScreen('dm')}
              disabled={isBlocked}
              className="flex-1 h-12 rounded-[14px] bg-white/76 text-[#2f261d] font-black text-xs active:scale-95 transition-transform flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageCircle size={14} /> 发送私信
            </button>
          </div>
        </section>

        <section className="mt-2 space-y-5">
          <div className="rounded-[16px] bg-gradient-to-r from-[#fff1f4] via-white to-[#fffaf4] px-4 py-4 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <h4 className="text-sm font-black text-[#2f261d] flex items-center gap-2">
                  <Heart size={15} className="text-[#FE2C55] fill-current" /> 关系状态
                </h4>
                <p className="mt-1 text-[11px] text-[#8f7f6d] font-bold">目前还没有与 TA 建立专属关系标记</p>
              </div>
              <button
                onClick={() => setScreen('relation-invite')}
                className="h-9 px-4 bg-[#FE2C55] text-white rounded-full text-[10px] font-black active:scale-95 transition-transform shrink-0"
              >
                发起绑定
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h4 className="text-xs font-black text-[#2f261d]">TA 的共创作品</h4>
            </div>

            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {filterOptions.map(opt => (
                <button
                  key={opt}
                  onClick={() => setFilter(opt)}
                  className={`px-4 py-2 rounded-full text-[10px] font-black transition-all whitespace-nowrap ${
                    filter === opt
                    ? 'bg-[#2f261d] text-white shadow-sm'
                    : 'bg-white/82 text-[#8f7f6d]'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2.5 pb-8">
              {filteredWorks.map((work, index) => {
                const topic = TOPICS[(work.id + index) % TOPICS.length];
                const isPending = work.status !== '已成圈';
                return (
                  <button key={work.id} className="relative aspect-[3/4.1] overflow-hidden rounded-[18px] bg-[#f6ede3] shadow-[0_12px_24px_rgba(103,81,58,0.08)] active:scale-[0.98] transition-transform text-left">
                    <img src={topic.image} alt="" className={`absolute inset-0 h-full w-full object-cover transition-all ${isPending ? 'scale-105 blur-[6px]' : ''}`} />
                    <div className={`absolute inset-0 bg-gradient-to-t ${isPending ? 'from-black/75 via-black/30 to-black/5' : 'from-black/65 via-black/15 to-transparent'}`} />
                    <span className="absolute left-2.5 top-2.5 rounded-full bg-white/90 px-2 py-1 text-[9px] font-black text-[#2f261d] shadow-sm">
                      {getDisplayStatus(work)}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-3">
                      <p className="text-sm font-black text-white leading-tight line-clamp-2">{topic.title}</p>
                      <div className="mt-2 flex items-center justify-between text-white/85">
                        <span className="text-[10px] font-black">{topic.likes}</span>
                        <span className="text-[10px] font-black">2.4k</span>
                      </div>
                    </div>
                  </button>
                );
              })}
              {filteredWorks.length === 0 && (
                <div className="col-span-2 py-20 text-center">
                  <p className="text-[#b0a08e] text-xs font-black tracking-widest">暂无相关作品</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {isMoreOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[90] flex flex-col justify-end bg-black/28 backdrop-blur-sm"
            onClick={closeMore}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 260 }}
              className="rounded-t-[32px] bg-[#fffaf5] px-5 pb-8 pt-3 shadow-[0_-18px_50px_rgba(73,55,39,0.16)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-[#eadfce]" />
              <div className="mb-4 flex items-center gap-3">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${displayId}`} alt="" className="h-11 w-11 rounded-xl bg-[#f6ede3]" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-black text-[#2f261d]">{remarkName || displayName}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#a79584]">{displayId}</p>
                </div>
              </div>
              {[
                { label: '发私信', icon: MessageCircle, action: () => { closeMore(); setScreen('dm'); } },
                { label: '设置备注', icon: Pencil, action: () => { closeMore(); setRemarkDraft(userRemarks[userName] || ''); setIsRemarkOpen(true); } },
                { label: isFollowed ? '取消关注' : '关注', icon: UserPlus, action: handleFollowToggleFromMenu },
                { label: '举报', icon: AlertTriangle, action: handleReport, danger: true },
                { label: '拉黑', icon: Lock, action: () => setIsBlockConfirmOpen(true), danger: true },
              ].map(item => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className={`flex w-full items-center gap-3 rounded-[16px] px-4 py-3.5 text-left active:bg-[#f6ede3] transition-colors ${
                    item.danger ? 'text-rose-500' : 'text-[#2f261d]'
                  }`}
                >
                  <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${item.danger ? 'bg-rose-50' : 'bg-[#f6ede3]'}`}>
                    <item.icon size={17} />
                  </span>
                  <span className="text-sm font-black">{item.label}</span>
                </button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isRemarkOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[95] flex items-center justify-center bg-black/30 px-6 backdrop-blur-sm"
            onClick={() => setIsRemarkOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 12 }}
              className="w-full rounded-[20px] bg-[#fffaf5] p-5 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-black text-[#2f261d]">设置备注</h3>
              <p className="mt-1 text-xs font-bold text-[#8f7f6d]">给 {displayName} 一个你更容易识别的名字。</p>
              <input
                value={remarkDraft}
                onChange={(e) => setRemarkDraft(e.target.value)}
                maxLength={16}
                placeholder="输入备注名"
                className="mt-5 h-12 w-full rounded-xl bg-[#f8f1e8] px-4 text-sm font-black text-[#2f261d] outline-none"
              />
              <div className="mt-5 grid grid-cols-2 gap-3">
                <button onClick={() => setIsRemarkOpen(false)} className="h-11 rounded-xl bg-white text-sm font-black text-[#8f7f6d] shadow-sm active:scale-95 transition-transform">取消</button>
                <button onClick={saveRemark} className="h-11 rounded-xl bg-[#2f261d] text-sm font-black text-white active:scale-95 transition-transform">保存</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isBlockConfirmOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] flex items-end bg-black/32 backdrop-blur-sm"
            onClick={() => setIsBlockConfirmOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="w-full rounded-t-[32px] bg-[#fffaf5] px-6 pb-8 pt-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 text-rose-500">
                <AlertTriangle size={26} />
              </div>
              <h3 className="text-center text-xl font-black text-[#2f261d]">确认拉黑 {remarkName || displayName}？</h3>
              <p className="mx-auto mt-3 max-w-[280px] text-center text-xs font-bold leading-relaxed text-[#8f7f6d]">
                拉黑后，对方将无法与你私信互动，也会进入设置中的黑名单列表。
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button onClick={() => setIsBlockConfirmOpen(false)} className="h-12 rounded-xl bg-white text-sm font-black text-[#8f7f6d] shadow-sm active:scale-95 transition-transform">再想想</button>
                <button onClick={handleBlock} className="h-12 rounded-xl bg-rose-500 text-sm font-black text-white active:scale-95 transition-transform">确认拉黑</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


// --- Personal Profile Screen ---

const PersonalProfileScreen = ({ setScreen, profile, setProfile, showToast }: {
  setScreen: (s: Screen) => void,
  profile: EditableProfile,
  setProfile: (profile: EditableProfile) => void,
  showToast: (message: string) => void
}) => {
  const [draft, setDraft] = useState<EditableProfile>(profile);
  const updateDraft = (key: keyof EditableProfile, value: string) => {
    setDraft(prev => ({ ...prev, [key]: value }));
  };
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => updateDraft('avatar', event.target?.result as string);
    reader.readAsDataURL(file);
  };
  const saveProfile = () => {
    setProfile(draft);
    showToast('个人资料已保存');
    setScreen('me');
  };

  return (
    <div className={lightPageRootPadded}>
      <header className={lightHeaderShell}>
        <button onClick={() => setScreen('me')} className={lightIconButton}>
          <ArrowLeft size={20} />
        </button>
        <h2 className="font-bold text-[#2f261d]">个人主页</h2>
        <button onClick={saveProfile} className="h-10 px-4 rounded-xl bg-[#2f261d] text-white text-xs font-black active:scale-95 transition-transform">
          保存
        </button>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-32">
        <section className="text-center py-8">
           <div className="relative w-28 h-28 mx-auto">
             <img src={draft.avatar} alt="" className="w-28 h-28 rounded-full bg-white mx-auto shadow-[0_12px_28px_rgba(73,55,39,0.14)] object-cover" />
             <label className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-[#2f261d] text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform cursor-pointer">
                <Camera size={18} />
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
             </label>
           </div>
           <h1 className="text-2xl font-black mt-5 text-[#2f261d]">{draft.name}</h1>
           <p className="text-[#8f7f6d] text-sm mt-1 font-black">@{draft.userId}</p>
           <p className="text-[#b0a08e] text-[10px] font-bold mt-1">IP：{draft.ipLocation}</p>
           <p className="text-[#7d6f61] text-xs leading-relaxed mt-4 px-8">{draft.bio}</p>
        </section>

        <section className="px-6 space-y-4">
           <div className="p-5 space-y-4 rounded-[20px] bg-white/68 shadow-[0_12px_28px_rgba(103,81,58,0.05)]">
              <h4 className="text-[11px] font-black text-[#8f7f6d]">编辑资料</h4>
              <label className="block space-y-2">
                <span className="text-[10px] font-black text-[#a79584]">名称</span>
                <input value={draft.name} onChange={(e) => updateDraft('name', e.target.value)} className="w-full h-12 rounded-xl bg-[#f8f1e8] px-4 text-sm font-bold text-[#2f261d] outline-none" />
              </label>
              <label className="block space-y-2">
                <span className="text-[10px] font-black text-[#a79584]">UserID</span>
                <div className="flex h-12 rounded-xl bg-[#f8f1e8] px-4 items-center gap-1">
                  <span className="text-sm font-bold text-[#8f7f6d]">@</span>
                  <input value={draft.userId} onChange={(e) => updateDraft('userId', e.target.value.replace(/^@/, ''))} className="flex-1 bg-transparent text-sm font-bold text-[#2f261d] outline-none" />
                </div>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block space-y-2">
                  <span className="text-[10px] font-black text-[#a79584]">性别</span>
                  <select value={draft.gender} onChange={(e) => updateDraft('gender', e.target.value)} className="w-full h-12 rounded-xl bg-[#f8f1e8] px-4 text-sm font-bold text-[#2f261d] outline-none">
                    <option value="">不填写</option>
                    <option value="男">男</option>
                    <option value="女">女</option>
                    <option value="其他">其他</option>
                  </select>
                </label>
                <label className="block space-y-2">
                  <span className="text-[10px] font-black text-[#a79584]">生日</span>
                  <input type="date" value={draft.birthday} onChange={(e) => updateDraft('birthday', e.target.value)} className="w-full h-12 rounded-xl bg-[#f8f1e8] px-3 text-sm font-bold text-[#2f261d] outline-none" />
                </label>
              </div>
              <label className="block space-y-2">
                <span className="text-[10px] font-black text-[#a79584]">个人描述</span>
                <textarea value={draft.bio} onChange={(e) => updateDraft('bio', e.target.value)} className="w-full min-h-[92px] rounded-xl bg-[#f8f1e8] px-4 py-3 text-sm font-bold leading-relaxed text-[#2f261d] outline-none resize-none" />
              </label>
           </div>

           <div className="p-6 bg-white/82 rounded-[24px] space-y-6 border border-[#eadfce] shadow-2xl">
              <div className="flex justify-between items-center">
                 <h4 className="text-[10px] font-black uppercase text-[#8f7f6d] tracking-widest ml-1">已绑定关系</h4>
                 <button onClick={() => setScreen('relation-invite')} className="w-8 h-8 bg-white rounded-lg border border-[#eadfce] flex items-center justify-center text-[#8f7f6d] hover:text-[#2f261d] transition-colors">
                    <Plus size={18} />
                 </button>
              </div>
              <div className="space-y-4">
                 {[
                   { name: '林野', type: '真爱', time: '214 天', color: 'rose' },
                   { name: 'Mia', type: '闺蜜', time: '45 天', color: 'indigo' },
                 ].map(rel => (
                    <div key={rel.name} className="flex items-center justify-between p-4 rounded-xl border border-[#eadfce] bg-white shadow-sm">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#f6ede3] flex items-center justify-center">
                             <UserIcon size={16} className="text-[#c0b09d]" />
                          </div>
                          <div>
                             <p className="text-sm font-bold text-[#2f261d]">{rel.name}</p>
                             <p className={`text-[10px] font-black uppercase tracking-widest ${rel.color === 'rose' ? 'text-rose-400' : 'text-indigo-400'}`}>{rel.type}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-[10px] font-black text-[#b0a08e] uppercase tracking-widest">绑定时长</p>
                          <p className="text-xs font-bold text-[#2f261d]">{rel.time}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </section>
      </main>
    </div>
  );
};

// --- Relation Review Screen ---

const RelationReviewScreen = ({ setScreen, showToast }: { setScreen: (s: Screen) => void, showToast: (m: string) => void }) => {
  return (
    <div className="flex flex-col h-full bg-[#050505] relative overflow-hidden">
      {/* Immersive Space Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-full h-full opacity-40 blur-[130px] bg-gradient-to-bl from-gold/30 via-indigo-600/10 to-transparent"></div>
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 70% 20%, rgba(255,215,0,0.15) 0%, transparent 60%)'
          }}
        ></motion.div>
      </div>

      <header className="p-6 flex items-center justify-between relative z-20">
        <button onClick={() => setScreen('messages')} className="w-12 h-12 glass-pill rounded-xl flex items-center justify-center border border-white/5 active:scale-90 transition-transform">
          <ArrowLeft size={20} className="text-white" />
        </button>
        <div className="text-center">
          <h2 className="font-bold text-white tracking-[0.3em] uppercase text-[10px] opacity-60">Incoming Signal</h2>
          <div className="h-0.5 w-8 bg-gold mx-auto mt-1 rounded-full animate-pulse"></div>
        </div>
        <div className="w-12"></div>
      </header>

      <main className="flex-1 p-8 space-y-10 overflow-y-auto no-scrollbar relative z-10 pt-12">
        {/* Transmission Source Header */}
        <section className="space-y-6 text-center">
          <div className="relative inline-block">
             <motion.div
               animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
               transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
               className="absolute inset-[-15px] border border-gold/30 rounded-full"
             />
             <div className="w-28 h-28 rounded-[34px] bg-gradient-to-br from-gold to-yellow-600 p-1 shadow-[0_0_60px_rgba(255,215,0,0.2)] relative z-10">
                <div className="w-full h-full rounded-[32px] bg-dark overflow-hidden flex items-center justify-center p-0.5 relative group">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=FriendLin" className="w-full h-full object-cover rounded-[30px]" alt="Sender" />
                  <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-xl flex items-center justify-center text-dark shadow-xl border-4 border-dark">
                  <Heart size={18} fill="currentColor" />
                </div>
             </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-[10px] font-black uppercase text-gold tracking-[0.4em] mb-1">来自 林野 的讯号</h4>
            <h1 className="text-4xl font-black text-white italic tracking-tighter leading-none">邀请你开启「真爱」绑定</h1>
          </div>
        </section>

        {/* Message Content */}
        <section className="relative">
           <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold to-transparent opacity-20"></div>
           <div className="bg-white/5 rounded-[24px] p-8 border border-white/5 relative backdrop-blur-md overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <MessageCircle size={60} />
              </div>
              <h4 className="text-[10px] font-black uppercase text-white/30 tracking-widest mb-4">附带讯息 / Transmitted Note</h4>
              <p className="text-base font-medium leading-[1.8] italic text-white/80">
                “我们从城市声音认识，想把这段关系标记得更正式一点，在每个共创的时刻，你都是唯一的频率。”
              </p>
           </div>
        </section>

        {/* Ritual Cost Disclosure */}
        <div className="p-6 bg-gradient-to-r from-gold/10 to-transparent rounded-xl space-y-4 border border-gold/10">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gold">
                <Gem size={14} />
              </div>
              <h4 className="text-[10px] font-black uppercase text-white/40 tracking-widest uppercase">协议说明</h4>
           </div>
           <p className="text-[11px] text-white/50 leading-relaxed italic border-l border-white/10 pl-4">
             确认绑定将消耗对方刚才支付的「星轨戒指」(520 钻石)。真爱关系每位用户仅限一位。绑定后，双方空间将产生永久的数字共鸣标记。
           </p>
        </div>
      </main>

      <footer className="p-8 pb-12 relative z-20 space-y-4">
         <button
           onClick={() => {
             showToast('恭喜！星轨轨道已对接成功。');
             setTimeout(() => setScreen('me'), 1000);
           }}
           className="w-full h-16 bg-white rounded-[18px] font-black uppercase text-xs text-dark shadow-[0_20px_50px_rgba(255,255,255,0.2)] active:scale-95 transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
         >
            <div className="absolute inset-0 bg-gold translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
            <span className="relative z-10 flex items-center gap-2">
              同意并开启共鸣 <Zap size={14} fill="currentColor" />
            </span>
         </button>

         <button
           onClick={() => setScreen('messages')}
           className="w-full h-14 bg-white/5 border border-white/10 rounded-[18px] font-black uppercase text-[10px] tracking-[0.2em] text-white/40 active:scale-95 transition-all"
         >
            暂时保持独立轨道
         </button>
      </footer>
    </div>
  );
};
