export default function IframePage({ params }: { params: { url: string } }) {
  return (
    <iframe className="w-full h-full rounded-lg" src={decodeURIComponent(params.url as string)}></iframe>
  );
}
