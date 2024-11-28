import Link from "next/link";

export default function CategoryNotFoundPage() {
  return (
    <div>
      <h1>404 Not Found</h1>
      <Link href={'/'}>Regresar</Link>
    </div>
  );
}