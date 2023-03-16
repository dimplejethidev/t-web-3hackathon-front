import { Member } from "@/src/components/elements/Member/Member";
import clsx from "clsx";
import uuid from "react-uuid";

export type MembersProps = {
  className?: string;
};

/**
 * メンバー一覧
 * @component
 * @author keit
 * @param className 親要素から指定されるスタイル
 */
export const Members = ({ className }: MembersProps) => {
  return (
    <div
      className={clsx(
        "bg-black-900",
        "p-10",
        "rounded-2xl",
        "min-w-[768px]",
        "max-w-[1280px]",
        "shadow-main-s",
        "w-[90%]",
        className,
      )}
    >
      <div className={clsx("text-4xl", "font-bold", "mb-16")}>Members</div>
      <div
        className={clsx(
          "flex",
          "justify-start",
          "flex-wrap",
          "h-[500px]",
          "scrollbar",
          "scrollbar-thumb-primary",
          "scrollbar-track-[#000000]",
          "scrollbar-thumb-rounded-full",
          "scrollbar-track-rounded-full",
        )}
      >
        {members.length === 0
          ? null
          : members.map((member) => {
              return (
                <div key={uuid()}>
                  <Member member={member} />
                </div>
              );
            })}
      </div>
    </div>
  );
};

const members: Member[] = [
  {
    name: "kimi",
    iconUrl: "/img/logo_icon.png",
    lv: 1,
    stage: "初級",
  },
  {
    name: "kimi",
    iconUrl: "/img/logo_icon.png",
    lv: 1,
    stage: "初級",
  },
  {
    name: "kimi",
    iconUrl: "/img/logo_icon.png",
    lv: 1,
    stage: "初級",
  },
  {
    name: "kimi",
    iconUrl: "/img/logo_icon.png",
    lv: 1,
    stage: "初級",
  },
  {
    name: "kimi",
    iconUrl: "/img/logo_icon.png",
    lv: 1,
    stage: "初級",
  },
  {
    name: "kimi",
    iconUrl: "/img/logo_icon.png",
    lv: 1,
    stage: "初級",
  },
  {
    name: "kimi",
    iconUrl: "/img/logo_icon.png",
    lv: 1,
    stage: "初級",
  },
  {
    name: "kimi",
    iconUrl: "/img/logo_icon.png",
    lv: 1,
    stage: "初級",
  },
  {
    name: "kimi",
    iconUrl: "/img/logo_icon.png",
    lv: 1,
    stage: "初級",
  },
  {
    name: "kimi",
    iconUrl: "/img/logo_icon.png",
    lv: 1,
    stage: "初級",
  },
];
