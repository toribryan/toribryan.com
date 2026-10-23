"use client"

import type { ReactNode } from "react"

import { fieldFor, IsoCanvas, type IsoArt } from "@/components/mdx-iso-cards"
import { ISO_FIGURES, type IsoFigureName } from "@/components/mdx-iso-figure"
import { ComponentDesk } from "@/features/portfolio/components/iso/component-desk"
import { RabbitRun } from "@/features/portfolio/components/iso/rabbit-run"
import { StaticTv } from "@/features/portfolio/components/iso/static-tv"

import type { IsoPiece } from "../data/gallery"

type Scene = {
  /** Takes clicks and keys in its tile, so the tile can't be one button. */
  live: boolean
  tile: () => ReactNode
  full: () => ReactNode
}

const HIDE_CAPTIONS = "[&_figcaption]:hidden [&_svg+div]:hidden"

function figure(name: IsoFigureName): Scene {
  const Figure = ISO_FIGURES[name]
  return { live: true, tile: () => <Figure />, full: () => <Figure /> }
}

const SCENES: Record<Exclude<IsoPiece, IsoArt>, Scene> = {
  "component-desk": {
    live: true,
    tile: () => <ComponentDesk />,
    full: () => <ComponentDesk />,
  },
  "static-tv": {
    live: true,
    tile: () => <StaticTv />,
    full: () => <StaticTv />,
  },
  "rabbit-run": {
    live: false,
    tile: () => <RabbitRun demo />,
    full: () => <RabbitRun />,
  },
  "fibo-written": figure("fibo-written"),
  "fibo-enforced": figure("fibo-enforced"),
}

function sceneFor(piece: IsoPiece): Scene {
  if (piece in SCENES) return SCENES[piece as keyof typeof SCENES]
  const art = piece as IsoArt
  const draw = () => <IsoCanvas art={art} seed={1} field={fieldFor([art])} />
  return { live: false, tile: draw, full: draw }
}

/** Whether a piece plays in its own tile rather than opening on a click. */
export function isLiveIso(piece: IsoPiece) {
  return sceneFor(piece).live
}

/**
 * An iso drawing, dot art or a working line-art scene, on a card so it
 * reads as one piece on the wall. `full` is the lightbox's version, which
 * for Rabbit run is the playable game rather than its demo.
 */
export function GalleryIso({
  piece,
  full,
}: {
  piece: IsoPiece
  full?: boolean
}) {
  const scene = sceneFor(piece)
  return (
    <div className={HIDE_CAPTIONS}>{full ? scene.full() : scene.tile()}</div>
  )
}
