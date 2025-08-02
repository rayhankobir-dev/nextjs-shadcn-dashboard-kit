import Image from "next/image";

interface HeadingProps {
  title: string;
  description: string;
}

function Heading({ title, description }: HeadingProps) {
  return (
    <div className="flex flex-col space-y-2 text-left">
      <Image
        src="https://ecme-next.themenate.net/_next/image?url=%2Fimg%2Flogo%2Flogo-light-streamline.png&w=128&q=75"
        alt="Logo"
        className="mb-4 h-20 w-20"
        width={500}
        height={500}
      />
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      <p className="text-muted-foreground text-sm font-medium">{description}</p>
    </div>
  );
}

export default Heading;
