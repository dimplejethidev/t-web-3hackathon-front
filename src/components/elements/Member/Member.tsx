import { FC } from "react";
import Image from "next/image";
import styles from "src/components/elements/Member/Member.module.css";

export type Member = {
  name: string;
  iconUrl: string;
  lv: number;
  stage: string;
};

/**
 * メンバー
 * @component
 * @author keit
 */
export const Member: FC<{ member: Member }> = ({ member }) => {
  return (
    <div className={styles.contents}>
      <div className={styles.icon}>
        <Image
          className={styles.iconImg}
          src={member.iconUrl}
          alt="icon"
          width={200}
          height={200}
        />
      </div>
      <div className={styles.detail}>
        <div className={styles.levelAndStage}>
          <div className={styles.level}>LV.{member.lv}</div>
          <div className={styles.stage}>{member.stage}</div>
        </div>
        <div className={styles.name}>{member.name}</div>
      </div>
    </div>
  );
};
