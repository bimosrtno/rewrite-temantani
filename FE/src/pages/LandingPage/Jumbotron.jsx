export default function Jumbotron() {
    return (
      <section className="relative bg-gradient-to-b from-gray-300 to-white bg-cover bg-center">
        <div className="absolute top-1 left-4 z-20"></div>
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
          <a
            href="#"
            className="inline-flex justify-between items-center py-1 px-1 pe-4 mb-7 text-sm text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800"
          >
            <span className="text-xs bg-blue-600 rounded-full text-white px-4 py-1.5 me-3">
              New
            </span>
            <span className="text-sm font-medium">
              Solusi Pertanian Modern! Teman Tani Hadir untuk Anda
            </span>
            <svg
              className="w-2.5 h-2.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </a>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-black md:text-5xl lg:text-6xl dark:text-black">
          Distributor Pupuk Terpercaya
          </h1>
          <p className="mb-8 text-lg font-normal text-black lg:text-xl sm:px-16 lg:px-48 dark:text-black">
            Teman Tani hadir untuk menyediakan pupuk berkualitas tinggi dengan harga terbaik. 
            Kami mendukung petani Indonesia dalam meningkatkan hasil panen dengan produk terpercaya.
          </p>
        </div>
      </section>
    );
  }
  