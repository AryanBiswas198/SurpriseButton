'use client'
export default function Footer() {
  const handleClick = () => {
    window.open("https://drive.google.com/file/d/12VYa4I0rMCLefPboEhscCIWiSD-ZihGB/view?usp=sharing", "_blank");
  };

  return (
    <footer className="mt-8 py-5 text-gray-400 text-lg">
      Made with ❤️ by{" "}
      <span
        className="underline cursor-pointer"
        onClick={handleClick}
      >
        Aryan Biswas
      </span>
    </footer>
  );
}
