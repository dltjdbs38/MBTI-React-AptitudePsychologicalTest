const NewsList = () => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //async를 사용하는 함수 따로 선언
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
        );
        setArticles(response.data.articles);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  //대기 중일 때
  if (loading) {
    return <NewsListBlock>Loading...</NewsListBlock>;
  }

  //아직 articles 값이 설정되지 않았을 때
  if (!articles) {
    return null;
  }

  //articles 값이 유효할 때
  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};
