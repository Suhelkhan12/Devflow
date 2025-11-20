import { MetricProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Metric = (props: MetricProps) => {
  const metricContent = (
    <>
      <Image
        src={props.imgUrl}
        alt={props.alt}
        width={20}
        height={20}
        className={cn("rounded-full object-cover", props.imgStyles)}
      />

      <p className={cn("flex items-center gap-1", props.textStyles)}>
        {props.value}
        {props.title && <span className={cn("small-regular line-clamp-1", props.titleStyles)}>{props.title}</span>}
      </p>
    </>
  );
  return props.href ? (
    <Link href={props.href} className="flex-center gap-1">
      {metricContent}
    </Link>
  ) : (
    <div className="flex-center gap-0.5">{metricContent}</div>
  );
};

export default Metric;
