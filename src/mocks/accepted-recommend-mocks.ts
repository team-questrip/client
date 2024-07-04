import MockAdapter from 'axios-mock-adapter';
import { axiosInstance } from '../api/axiosInstance';

const mock = new MockAdapter(axiosInstance, { delayResponse: 500 });

mock.onGet(`api/v1/recommend/ACCEPTED?page=0`).reply(200, {
  status: 'SUCCESS',
  message: null,
  data: {
    content: Array.from({ length: 10 }, () => ({
      id: 1,
      userId: 1,
      status: 'KEPT',
      createdAt: '2024-06-03T22:19:00',
      updatedAt: '2024-06-03T22:19:00',
      place: {
        id: 'test',
        googlePlaceId: 'ChIJo0gMXbOlfDURSjmLcTy52qQ',
        placeName: 'Kkochijib',
        primaryType: 'japanese_restaurant',
        formattedAddress: 'South Korea, Seoul, Songpa-gu, 잠실본동 314-5',
        location: {
          latitude: 37.5051148,
          longitude: 127.08420179999999,
        },
        content: {
          recommendationReason: 'testRecommend',
          activity: 'testActivity',
        },
        images: [
          {
            sequence: 1,
            url: 'https://questrip-reward.s3.ap-northeast-2.amazonaws.com/836d62f7-b1a7-4550-b137-f292ea5f881c.HEIC',
          },
          {
            sequence: 2,
            url: 'https://questrip-reward.s3.ap-northeast-2.amazonaws.com/e2f8b8cc-fd53-47da-bea5-c113f8f6393c.jpeg',
          },
        ],
        openingHours: [
          'Monday: 5:00PM-2:00AM',
          'Tuesday: 5:00PM-2:00AM',
          'Wednesday: 5:00PM-2:00AM',
          'Thursday: 5:00PM-2:00AM',
          'Friday: 5:00PM-2:00AM',
          'Saturday: 5:00PM-2:00AM',
          'Sunday: 5:00PM-2:00AM',
        ],
        openNow: 'CLOSE',
        menuGroups: [
          {
            groupName: '면류',
            menus: [
              {
                menuName: '짜장면',
                price: 7000,
                description: '자신없어요',
              },
              {
                menuName: '짬뽕',
                price: 10000,
                description: '얼큰 짬뽕',
              },
            ],
          },
          {
            groupName: '밥류',
            menus: [
              {
                menuName: '짜장밥',
                price: 9000,
                description: '짜장소스 추가',
              },
              {
                menuName: '볶음밥',
                price: 8000,
                description: '고슬고슬 맛있는 볶음밥',
              },
            ],
          },
        ],
      },
    })),
    page: 0,
    size: 10,
    numberOfElements: 10,
    hasNext: true,
  },
});

mock.onGet(`api/v1/recommend/ACCEPTED`).reply(200, {
  status: 'SUCCESS',
  message: null,
  data: {
    content: Array.from({ length: 10 }, () => ({
      id: 1,
      userId: 1,
      status: 'KEPT',
      createdAt: '2024-06-03T22:19:00',
      updatedAt: '2024-06-03T22:19:00',
      place: {
        id: 'test',
        googlePlaceId: 'ChIJo0gMXbOlfDURSjmLcTy52qQ',
        placeName: 'Kkochijib',
        primaryType: 'japanese_restaurant',
        formattedAddress: 'South Korea, Seoul, Songpa-gu, 잠실본동 314-5',
        location: {
          latitude: 37.5051148,
          longitude: 127.08420179999999,
        },
        content: {
          recommendationReason: 'testRecommend',
          activity: 'testActivity',
        },
        images: [
          {
            sequence: 1,
            url: 'https://questrip-reward.s3.ap-northeast-2.amazonaws.com/836d62f7-b1a7-4550-b137-f292ea5f881c.HEIC',
          },
          {
            sequence: 2,
            url: 'https://questrip-reward.s3.ap-northeast-2.amazonaws.com/e2f8b8cc-fd53-47da-bea5-c113f8f6393c.jpeg',
          },
        ],
        openingHours: [
          'Monday: 5:00PM-2:00AM',
          'Tuesday: 5:00PM-2:00AM',
          'Wednesday: 5:00PM-2:00AM',
          'Thursday: 5:00PM-2:00AM',
          'Friday: 5:00PM-2:00AM',
          'Saturday: 5:00PM-2:00AM',
          'Sunday: 5:00PM-2:00AM',
        ],
        openNow: 'CLOSE',
        menuGroups: [
          {
            groupName: '면류',
            menus: [
              {
                menuName: '짜장면',
                price: 7000,
                description: '자신없어요',
              },
              {
                menuName: '짬뽕',
                price: 10000,
                description: '얼큰 짬뽕',
              },
            ],
          },
          {
            groupName: '밥류',
            menus: [
              {
                menuName: '짜장밥',
                price: 9000,
                description: '짜장소스 추가',
              },
              {
                menuName: '볶음밥',
                price: 8000,
                description: '고슬고슬 맛있는 볶음밥',
              },
            ],
          },
        ],
      },
    })),
    page: 0,
    size: 10,
    numberOfElements: 10,
    hasNext: true,
  },
});

mock.onGet(`api/v1/recommend/ACCEPTED?page=1`).reply(200, {
  status: 'SUCCESS',
  message: null,
  data: {
    content: Array.from({ length: 10 }, () => ({
      id: 1,
      userId: 1,
      status: 'KEPT',
      createdAt: '2024-06-03T22:19:00',
      updatedAt: '2024-06-03T22:19:00',
      place: {
        id: 'test',
        googlePlaceId: 'ChIJo0gMXbOlfDURSjmLcTy52qQ',
        placeName: 'Kkochijib',
        primaryType: 'japanese_restaurant',
        formattedAddress: 'South Korea, Seoul, Songpa-gu, 잠실본동 314-5',
        location: {
          latitude: 37.5051148,
          longitude: 127.08420179999999,
        },
        content: {
          recommendationReason: 'testRecommend',
          activity: 'testActivity',
        },
        images: [
          {
            sequence: 1,
            url: 'https://questrip-reward.s3.ap-northeast-2.amazonaws.com/836d62f7-b1a7-4550-b137-f292ea5f881c.HEIC',
          },
          {
            sequence: 2,
            url: 'https://questrip-reward.s3.ap-northeast-2.amazonaws.com/e2f8b8cc-fd53-47da-bea5-c113f8f6393c.jpeg',
          },
        ],
        openingHours: [
          'Monday: 5:00PM-2:00AM',
          'Tuesday: 5:00PM-2:00AM',
          'Wednesday: 5:00PM-2:00AM',
          'Thursday: 5:00PM-2:00AM',
          'Friday: 5:00PM-2:00AM',
          'Saturday: 5:00PM-2:00AM',
          'Sunday: 5:00PM-2:00AM',
        ],
        openNow: 'CLOSE',
        menuGroups: [
          {
            groupName: '면류',
            menus: [
              {
                menuName: '짜장면',
                price: 7000,
                description: '자신없어요',
              },
              {
                menuName: '짬뽕',
                price: 10000,
                description: '얼큰 짬뽕',
              },
            ],
          },
          {
            groupName: '밥류',
            menus: [
              {
                menuName: '짜장밥',
                price: 9000,
                description: '짜장소스 추가',
              },
              {
                menuName: '볶음밥',
                price: 8000,
                description: '고슬고슬 맛있는 볶음밥',
              },
            ],
          },
        ],
      },
    })),
    page: 1,
    size: 10,
    numberOfElements: 10,
    hasNext: false,
  },
});

export default mock;
