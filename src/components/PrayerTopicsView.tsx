import React, { useState } from 'react';
import { Page } from '../types';
import {
  Heart,
  Shield,
  Sun,
  Moon,
  Users,
  Sparkles,
  Briefcase,
  GraduationCap,
  Plane,
  Compass,
  Smile,
  Anchor,
  CloudRain,
  Flame,
  Search,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { ChristianCross } from './SanctuaryLogo';

interface PrayerTopicsViewProps {
  onSelectTopic: (topic: string, promptSuggestion: string) => void;
  setCurrentPage: (page: Page) => void;
}

interface TopicItem {
  id: string;
  name: string;
  theme: string;
  scripture: string;
  prompt: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: 'Daily' | 'Emotional' | 'Life' | 'Spiritual';
}

const PRAYER_TOPICS: TopicItem[] = [
  {
    id: 'peace-anxiety',
    name: 'Peace & Anxiety',
    theme: 'Casting all worries upon Him when life feels overwhelming',
    scripture: 'Philippians 4:6-7',
    prompt: 'I am struggling with anxious thoughts and need God’s supernatural peace to guard my heart and mind.',
    icon: Anchor,
    tag: 'Emotional',
  },
  {
    id: 'healing',
    name: 'Healing',
    theme: 'Physical, emotional, and spiritual restoration by His stripes',
    scripture: 'Jeremiah 17:14',
    prompt: 'I am praying for divine healing and bodily strength for myself and loved ones facing physical illness.',
    icon: Heart,
    tag: 'Life',
  },
  {
    id: 'family',
    name: 'Family',
    theme: 'Unity, love, protection, and salvation for household members',
    scripture: 'Joshua 24:15',
    prompt: 'Lord, bring peace, unity, forgiveness, and godly guidance into our home and protect every family member.',
    icon: Users,
    tag: 'Life',
  },
  {
    id: 'marriage',
    name: 'Marriage',
    theme: 'Deepening covenant love, tender communication, and grace',
    scripture: 'Colossians 3:14',
    prompt: 'Strengthen our marriage with patience, humility, and sacrificial love that reflects Christ and the church.',
    icon: Sparkles,
    tag: 'Life',
  },
  {
    id: 'children',
    name: 'Children',
    theme: 'Wisdom, moral protection, and salvation for our youth',
    scripture: 'Psalm 127:3',
    prompt: 'Surround our children with angels, shield their minds from worldly deception, and draw them to Your heart.',
    icon: Users,
    tag: 'Life',
  },
  {
    id: 'protection',
    name: 'Protection',
    theme: 'Safety from spiritual darkness, harm, and the enemy’s traps',
    scripture: 'Psalm 91:1-2',
    prompt: 'Father, hide us under the shadow of Your wings and protect us from all unseen harm and snare.',
    icon: Shield,
    tag: 'Spiritual',
  },
  {
    id: 'grief',
    name: 'Grief',
    theme: 'Comfort in bereavement, deep loss, and brokenhearted seasons',
    scripture: 'Psalm 34:18',
    prompt: 'Lord, You are close to the brokenhearted. Comfort my aching soul in this deep season of grief and loss.',
    icon: CloudRain,
    tag: 'Emotional',
  },
  {
    id: 'hope',
    name: 'Hope',
    theme: 'Renewing faith in God’s good and sovereign tomorrow',
    scripture: 'Romans 15:13',
    prompt: 'Fill me with all joy and peace as I trust in You, so that I may overflow with radiant hope by the Holy Spirit.',
    icon: Sun,
    tag: 'Spiritual',
  },
  {
    id: 'strength',
    name: 'Strength',
    theme: 'Supernatural perseverance when weary and depleted',
    scripture: 'Isaiah 40:29-31',
    prompt: 'Renew my strength like the eagle’s; when I am depleted, let Your grace be sufficient and perfected in my weakness.',
    icon: Flame,
    tag: 'Spiritual',
  },
  {
    id: 'finances',
    name: 'Finances',
    theme: 'Godly stewardship, supernatural provision, and debt relief',
    scripture: 'Philippians 4:19',
    prompt: 'Lord, You are Jehovah Jireh. Open windows of provision, relieve financial strain, and grant wise stewardship.',
    icon: Briefcase,
    tag: 'Life',
  },
  {
    id: 'job-career',
    name: 'Job & Career',
    theme: 'Favor in the workplace, career direction, and purpose',
    scripture: 'Colossians 3:23',
    prompt: 'Guide my career steps, grant favor with colleagues and leadership, and open doors no man can shut.',
    icon: Briefcase,
    tag: 'Life',
  },
  {
    id: 'school-exams',
    name: 'School & Exams',
    theme: 'Sharp focus, retention, calm confidence, and academic wisdom',
    scripture: 'James 1:5',
    prompt: 'Give me clarity of mind, disciplined focus, and peace as I prepare for and take my academic examinations.',
    icon: GraduationCap,
    tag: 'Life',
  },
  {
    id: 'travel',
    name: 'Travel',
    theme: 'Safe passage, journey mercies, and smooth travels',
    scripture: 'Psalm 121:8',
    prompt: 'Protect our departure and arrival; place angels along the road, rail, and skies for safe journey mercies.',
    icon: Plane,
    tag: 'Life',
  },
  {
    id: 'forgiveness',
    name: 'Forgiveness',
    theme: 'Releasing bitterness, breaking resentment, and walking free',
    scripture: 'Ephesians 4:32',
    prompt: 'Empower me to release the burden of unforgiveness, just as Christ freely and abundantly forgave me.',
    icon: Heart,
    tag: 'Spiritual',
  },
  {
    id: 'faith',
    name: 'Faith',
    theme: 'Unyielding trust when walking through unseen storms',
    scripture: 'Hebrews 11:1',
    prompt: 'Increase my faith, Lord! Help me believe Your promises even when circumstances appear contrary.',
    icon: Anchor,
    tag: 'Spiritual',
  },
  {
    id: 'loneliness',
    name: 'Loneliness',
    theme: 'Experiencing the tangible companionship of Christ',
    scripture: 'Deuteronomy 31:6',
    prompt: 'Remind me that I am never forsaken; make Your intimate presence real to my heart today.',
    icon: Users,
    tag: 'Emotional',
  },
  {
    id: 'fear',
    name: 'Fear',
    theme: 'Overcoming terror with God’s perfect, casting-out love',
    scripture: '2 Timothy 1:7',
    prompt: 'God has not given me a spirit of fear, but of power, love, and a sound mind. I renounce panic in Jesus’ name.',
    icon: Shield,
    tag: 'Emotional',
  },
  {
    id: 'stress',
    name: 'Stress',
    theme: 'Trading hectic burdens for Christ’s easy yoke and rest',
    scripture: 'Matthew 11:28',
    prompt: 'I bring my heavy burdens to You, Jesus. Teach me to pace my soul according to Your unforced rhythms of grace.',
    icon: CloudRain,
    tag: 'Emotional',
  },
  {
    id: 'guidance',
    name: 'Guidance',
    theme: 'Discerning God’s will at crossroads and major choices',
    scripture: 'Proverbs 3:5-6',
    prompt: 'I acknowledge You in all my ways; make straight paths before me and grant discernment for this pivotal decision.',
    icon: Compass,
    tag: 'Spiritual',
  },
  {
    id: 'thanksgiving',
    name: 'Thanksgiving',
    theme: 'Praising God for His unending goodness and answered prayers',
    scripture: '1 Thessalonians 5:18',
    prompt: 'My heart overflows with gratitude for Your lovingkindness, mercies new each morning, and steadfast presence.',
    icon: Smile,
    tag: 'Spiritual',
  },
  {
    id: 'morning-prayer',
    name: 'Morning Prayer',
    theme: 'Dedication of the new day, thoughts, and steps to the Lord',
    scripture: 'Psalm 143:8',
    prompt: 'Cause me to hear Your lovingkindness in the morning; establish the work of my hands and direct my day for Your glory.',
    icon: Sun,
    tag: 'Daily',
  },
  {
    id: 'evening-prayer',
    name: 'Evening Prayer',
    theme: 'Reflecting on the day, laying down cares, and evening peace',
    scripture: 'Psalm 63:6',
    prompt: 'As the day ends, I release every burden, praise You for sustained breath, and shelter beneath Your grace tonight.',
    icon: Moon,
    tag: 'Daily',
  },
  {
    id: 'bedtime-prayer',
    name: 'Bedtime Prayer',
    theme: 'Sweet, restful sleep free from nightmares and midnight terror',
    scripture: 'Psalm 4:8',
    prompt: 'In peace I will lie down and sleep, for You alone, Lord, make me dwell in safety. Grant restorative rest tonight.',
    icon: Moon,
    tag: 'Daily',
  },
];

export const PrayerTopicsView: React.FC<PrayerTopicsViewProps> = ({
  onSelectTopic,
  setCurrentPage,
}) => {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<'All' | 'Daily' | 'Emotional' | 'Life' | 'Spiritual'>('All');

  const filteredTopics = PRAYER_TOPICS.filter((t) => {
    const matchesSearch =
      !search ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.theme.toLowerCase().includes(search.toLowerCase()) ||
      t.scripture.toLowerCase().includes(search.toLowerCase());
    const matchesTag = selectedTag === 'All' || t.tag === selectedTag;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-[#080E1E] text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <ChristianCross className="w-3.5 h-3.5" />
            <span>23 Biblical Prayer Foundations</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-sacred text-white tracking-tight">
            Scriptural Prayer Topics
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            No matter what season or circumstance you are facing, bring it to the Lord. Select any topic below to open a personalized, pastor-led prayer session anchored in God's Word.
          </p>
        </div>

        {/* Search & Tag Filter Bar */}
        <div className="bg-[#0D162F] border border-[#1E2E55] rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by topic, scripture, or need..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-[#080E1E] border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            />
          </div>

          {/* Tags */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none pb-1 md:pb-0 text-xs">
            {(['All', 'Daily', 'Emotional', 'Life', 'Spiritual'] as const).map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap cursor-pointer transition-colors ${
                  selectedTag === tag
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                    : 'bg-[#080E1E] text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredTopics.map((topic) => {
            const Icon = topic.icon;
            return (
              <div
                key={topic.id}
                className="bg-[#0D162F] hover:bg-[#111D3D] border border-[#1E2E55] hover:border-amber-400/50 rounded-2xl p-5 flex flex-col justify-between transition-all group shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                      {topic.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white font-serif-sacred group-hover:text-amber-300 transition-colors">
                      {topic.name}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {topic.theme}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#080E1E] border border-slate-800 text-[11px] text-amber-300/90 font-medium">
                    <BookOpen className="w-3 h-3 text-amber-400" />
                    <span>{topic.scripture}</span>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Pastor Prayer Ready</span>
                  <button
                    onClick={() => onSelectTopic(topic.name, topic.prompt)}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#E5A93C] to-[#C88A1E] text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow hover:brightness-110 cursor-pointer transition-all"
                  >
                    <span>Pray Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
