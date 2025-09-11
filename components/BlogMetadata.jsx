import { Clock, Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BlogMetadata({ data }) {
  return (
    <div className="mt-8 max-w-4xl mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white rounded-md p-4">
        {/* Author Section */}
        <Link
          href={`/profile/${data.usersTable.id}`}
          className="flex items-center gap-2 hover:opacity-90 transition-opacity"
          aria-label={`View ${data.usersTable.name}'s profile`}
        >
          <Image
            src={data.usersTable.profileUrl}
            alt={`${data.usersTable.name}'s avatar`}
            width={36}
            height={36}
            className="rounded-full object-cover border border-gray-200"
            loading="lazy"
          />
          <p className="text-lg font-medium text-gray-800">
            @{data.usersTable.name}
          </p>
        </Link>

        {/* Metadata Section */}
        <div className="flex items-center gap-4 flex-wrap text-sm text-gray-600">
          {/* Category Tag */}
          <span className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-700 font-medium">
            {data.blogs.categories}
          </span>

          {/* Separator */}
          <Dot className="w-3 h-3 text-gray-400" aria-hidden="true" />

          {/* Reading Time */}
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" aria-hidden="true" />
            <span>{data.blogs.readingTime} read</span>
          </div>

          {/* Expiration Status */}
          {data.blogs.expireAt && (
            <>
              <Dot className="w-3 h-3 text-gray-400" aria-hidden="true" />
              <span
                className={`px-1.5 py-0.5 rounded font-medium ${
                  Math.ceil((data.blogs.expireAt - Date.now()) / (1000 * 60 * 60 * 24)) <= 0
                    ? "bg-red-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {Math.ceil((data.blogs.expireAt - Date.now()) / (1000 * 60 * 60 * 24)) <= 0
                  ? "EXPIRED"
                  : `Days left: ${Math.ceil((data.blogs.expireAt - Date.now()) / (1000 * 60 * 60 * 24))}`}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}