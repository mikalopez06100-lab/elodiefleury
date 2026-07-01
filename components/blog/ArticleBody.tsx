type Props = {
  html: string;
};

export default function ArticleBody({ html }: Props) {
  return (
    <div
      className="article-prose"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
