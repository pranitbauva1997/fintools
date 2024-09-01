import { Meta, Title } from '@solidjs/meta';

export const SEO = (
  props: {
    title: string,
    description: string,
    keywords: string[],
    url: string,
  }

) => {
  return (
    <>
      <Title>{props.title}</Title>
      <Meta name="description" content={props.description} />
      <Meta name="keywords" content={props.keywords.join(', ')} />
      <Meta property="og:title" content={props.title} />
      <Meta property="og:description" content={props.description} />
      <Meta property="og:url" content={props.url} />
      <Meta property="og:type" content="website" />
    </>
  );
}
