import dayjs from "dayjs";
import "dayjs/locale/hr";
dayjs.locale("hr");

export const fmtDate = (iso) => dayjs(iso).format("D. MMMM YYYY.");
export const ymKey = (iso) => dayjs(iso).format("YYYY-MM");
export const ymLabel = (key) => dayjs(key + "-01").format("MMMM YYYY");
