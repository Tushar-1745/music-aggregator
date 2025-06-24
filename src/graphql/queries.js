export const GET_TRENDING_SONGS = `
  query GetTrendingSongs {
    trendingSongs {
      title
      artist
      platform
      metrics {
        views
        likes
      }
    }
  }
`;