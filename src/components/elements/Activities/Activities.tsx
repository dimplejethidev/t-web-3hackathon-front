import clsx from "clsx";
import uuid from "react-uuid";

const tdBaseStyle = clsx(
  "py-[20px]",
  "pl-[10px]",
  "font-bold",
  "border-[#636363]",
  "border-b-[1px]",
);

type Activity = {
  date: string;
  name: string;
  category: string;
  desc: string;
};

export type ActivitiesProps = {
  className: string;
};

/**
 * アクティビティ一覧
 * @component
 * @author keit
 */
export const Activities = ({ className }: ActivitiesProps) => {
  const activities = _getActivities(10);
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
      <div className={clsx("text-4xl", "font-bold", "mb-16")}>
        All Activities
      </div>
      <div
        className={clsx(
          "overflow-y-scroll",
          "h-[500px]",
          "scrollbar",
          "scrollbar-thumb-primary",
          "scrollbar-track-[#000000]",
          "scrollbar-thumb-rounded-full",
          "scrollbar-track-rounded-full",
        )}
      >
        <table
          className={clsx(
            "border-collapse",
            "bg-[#36393f]",
            "p-[10px]",
            "w-[100%]",
          )}
        >
          <tbody>
            {activities.length === 0
              ? null
              : activities.map((activity: Activity) => {
                  return (
                    <tr key={uuid()}>
                      <td className={clsx(tdBaseStyle, "w-[50px]")}>
                        {activity.date}
                      </td>
                      <td className={clsx(tdBaseStyle, "w-[150px]")}>
                        {activity.name}
                      </td>
                      <td className={clsx(tdBaseStyle, "w-[150px]")}>
                        {activity.category}
                      </td>
                      <td className={clsx(tdBaseStyle)}>{activity.desc}</td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const _getActivities = (num: number): Activity[] => {
  const activities: Activity[] = [];
  for (let i = 0; i < num; i++) {
    const activity: Activity = {
      date: "日付",
      name: "プロジェクト名",
      category: "タスクカテゴリ",
      desc: "タスク詳細tasukusyousaiタスク詳細tasukusyousai",
    };
    activities.push(activity);
  }
  return activities;
};
