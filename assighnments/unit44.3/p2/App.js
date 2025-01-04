function App() {
  return (
    <div>
      <Tweet
        name="test1"
        username="test1"
        date={new Date().toDateString()}
        message="test123"
      />
      <Tweet
        name="test2"
        username="test2"
        date={new Date().toDateString()}
        message="test123"
      />
      <Tweet
        name="test3"
        username="test3"
        date={new Date().toDateString()}
        message="test123"
      />
    </div>
  );
}
