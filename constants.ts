import { Room } from './types';

export const ROOMS: Room[] = [
  {
    id: 'room-1',
    name: 'The Void (공허)',
    price: 250000,
    capacity: 2,
    description: "순수한 화이트 노이즈와 미니멀리즘의 극치. 복잡한 생각은 문 밖에서 멈춥니다.",
    images: [
      'https://picsum.photos/800/1000?random=1',
      'https://picsum.photos/800/1000?random=11',
      'https://picsum.photos/800/1000?random=111'
    ],
    amenities: ['King Bed', 'Soundproof', 'Meditation Mat', 'No TV']
  },
  {
    id: 'room-2',
    name: 'Retro Future (레트로 퓨처)',
    price: 320000,
    capacity: 3,
    description: "80년대가 상상한 2050년. 네온 사인과 콘크리트 텍스처의 조화.",
    images: [
      'https://picsum.photos/800/1000?random=2',
      'https://picsum.photos/800/1000?random=22',
      'https://picsum.photos/800/1000?random=222'
    ],
    amenities: ['Vinyl Player', 'Neon Mood Light', 'Mini Bar', 'Bathtub']
  },
  {
    id: 'room-3',
    name: 'Forest Gump (숲)',
    price: 400000,
    capacity: 4,
    description: "실내에 조성된 작은 숲. 자연광과 식물들 사이에서의 휴식.",
    images: [
      'https://picsum.photos/800/1000?random=3',
      'https://picsum.photos/800/1000?random=33',
      'https://picsum.photos/800/1000?random=333'
    ],
    amenities: ['Queen Bed x2', 'Terrace', 'Plant Library', 'Organic Tea']
  }
];

export const NAV_LINKS = [
  { label: 'ROOMS', href: '#rooms' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'INFO', href: '#info' },
];