export default function IframePage({ params }: { params: { url: string } }) {
  console.log(params.url);
  return (
    <iframe className="w-full h-full rounded-lg" src={decodeURIComponent(params.url as string)}></iframe>
  );
}
