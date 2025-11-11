"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";

export default function FiltersBar({ categories, tags }) {
  const router = useRouter();
  const sp = useSearchParams();

  const init = () => ({
    q: sp.get("q") || "",
    cat: sp.get("cat") || "",
    tag: sp.get("tag") || "",
    y: sp.get("y") || "",
    m: sp.get("m") || "",
    sort: sp.get("sort") || "new",
  });

  const [form, setForm] = useState(init);

  useEffect(() => {
    setForm(init());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp]); // keep inputs in sync with URL changes (back/forward, external nav)

  const years = useMemo(() => {
    const now = new Date().getFullYear();
    return Array.from({ length: 10 }, (_, i) => String(now - i));
  }, []);

  const months = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        v: String(i + 1),
        l: new Date(2000, i, 1).toLocaleDateString("hr-HR", { month: "long" }),
      })),
    []
  );

  const set = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const p = new URLSearchParams();
    if (form.q) p.set("q", form.q);
    if (form.cat) p.set("cat", form.cat);
    if (form.tag) p.set("tag", form.tag);
    if (form.y) p.set("y", form.y);
    if (form.m) p.set("m", form.m);
    if (form.sort) p.set("sort", form.sort);
    // ensure we start from page 1 after changing filters
    p.delete("after");
    router.push(`/novosti?${p.toString()}`);
  };

  return (
    <Box component="form" onSubmit={onSubmit} sx={{ display: "grid", gap: 2, position: { md: "sticky" }, top: { md: 88 } }}>
      <TextField name="q" label="Traži" size="small" value={form.q} onChange={set("q")} />

      <FormControl size="small">
        <InputLabel>Kategorija</InputLabel>
        <Select name="cat" label="Kategorija" value={form.cat} onChange={set("cat")}>
          <MenuItem value="">
            <em>Sve</em>
          </MenuItem>
          {categories.map((c) => (
            <MenuItem key={c.slug} value={c.slug}>
              {c.name} ({c.count})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small">
        <InputLabel>Oznaka</InputLabel>
        <Select name="tag" label="Oznaka" value={form.tag} onChange={set("tag")}>
          <MenuItem value="">
            <em>Sve</em>
          </MenuItem>
          {tags.map((t) => (
            <MenuItem key={t.slug} value={t.slug}>
              {t.name} ({t.count})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
        <FormControl size="small">
          <InputLabel>Godina</InputLabel>
          <Select name="y" label="Godina" value={form.y} onChange={set("y")}>
            <MenuItem value="">
              <em>/</em>
            </MenuItem>
            {years.map((yy) => (
              <MenuItem key={yy} value={yy}>
                {yy}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small">
          <InputLabel>Mjesec</InputLabel>
          <Select name="m" label="Mjesec" value={form.m} onChange={set("m")}>
            <MenuItem value="">
              <em>/</em>
            </MenuItem>
            {months.map((mm) => (
              <MenuItem key={mm.v} value={mm.v}>
                {mm.l}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <FormControl size="small">
        <InputLabel>Sortiranje</InputLabel>
        <Select name="sort" label="Sortiranje" value={form.sort} onChange={set("sort")}>
          <MenuItem value="new">Najnovije</MenuItem>
          <MenuItem value="old">Najstarije</MenuItem>
        </Select>
      </FormControl>

      <Button type="submit" variant="contained">
        Filtriraj
      </Button>
    </Box>
  );
}
