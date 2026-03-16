import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import type { BuildCategory, BuildData } from "../engine/buildSchema";
import type { GenerateBuildRequest } from "../engine/buildSchema";
import { generateBuild } from "../engine/generator";
import Viewer3D from "../components/Build/Viewer3D";
import Viewer2D from "../components/Build/Viewer2D";
import MaterialsList from "../components/Build/MaterialsList";
import SchematicDownload from "../components/Build/SchematicDownload";
import BuildMeta from "../components/Build/BuildMeta";
import styles from "./BuildPage.module.css";
import { Box, Map, ArrowLeft } from "lucide-react";

type ViewMode = "3d" | "2d";

function formatCategoryLabel(category: string) {
	if (!category) return "Build";
	return category.charAt(0).toUpperCase() + category.slice(1);
}

export default function BuildPage() {
	const [params] = useSearchParams();
	const navigate = useNavigate();
	const [viewMode, setViewMode] = useState<ViewMode>("3d");
	const [build, setBuild] = useState<BuildData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const buildRequest = useMemo<GenerateBuildRequest>(() => {
		const description = params.get("description") ?? "";
		const category = (params.get("category") ??
			"house") as BuildCategory;
		const blocks = (params.get("blocks") ?? "Stone")
			.split(",")
			.filter(Boolean);
		const width = Math.max(
			1,
			Math.min(200, Number(params.get("width") ?? 20)),
		);
		const height = Math.max(
			1,
			Math.min(200, Number(params.get("height") ?? 12)),
		);
		return {
			description,
			category,
			blocks,
			width,
			height,
		};
	}, [params]);

	useEffect(() => {
		let cancelled = false;

		async function loadBuild() {
			setLoading(true);
			setError(null);
			try {
				const generated =
					await generateBuild(buildRequest);
				if (cancelled) return;
				setBuild({
					...generated,
					category:
						generated.category ||
						buildRequest.category,
				});
			} catch {
				if (cancelled) return;
				setError(
					"Unable to generate this build right now.",
				);
			} finally {
				if (!cancelled) {
					setLoading(false);
				}
			}
		}

		void loadBuild();
		return () => {
			cancelled = true;
		};
	}, [buildRequest]);

	if (loading) {
		return (
			<main className={styles.main}>
				<div className="container">
					<div
						className={`card ${styles.metaCard}`}
					>
						<h1 className={styles.title}>
							Generating build...
						</h1>
					</div>
				</div>
			</main>
		);
	}

	if (error || !build) {
		return (
			<main className={styles.main}>
				<div className="container">
					<div
						className={`card ${styles.metaCard}`}
					>
						<h1 className={styles.title}>
							Build unavailable
						</h1>
						<p>
							{error ??
								"No build data was returned."}
						</p>
						<button
							type="button"
							className="btn btn-ghost btn-sm"
							onClick={() =>
								navigate(-1)
							}
						>
							<ArrowLeft size={15} />
							Back
						</button>
					</div>
				</div>
			</main>
		);
	}

	return (
		<main className={styles.main}>
			<div className="container">
				{/* Page header */}
				<div className={styles.pageHeader}>
					<button
						type="button"
						className="btn btn-ghost btn-sm"
						onClick={() => navigate(-1)}
					>
						<ArrowLeft size={15} />
						Back
					</button>
					<h1 className={styles.title}>
						{formatCategoryLabel(
							build.category,
						)}{" "}
						Build
					</h1>
					<SchematicDownload build={build} />
				</div>

				<div className={styles.layout}>
					{/* Left: viewer + meta */}
					<div className={styles.viewerCol}>
						{/* View toggle */}
						<div
							className={`card ${styles.viewerCard}`}
						>
							<div
								className={
									styles.viewerHeader
								}
							>
								<button
									type="button"
									className={`btn btn-sm ${viewMode === "3d" ? "btn-primary" : "btn-ghost"}`}
									onClick={() =>
										setViewMode(
											"3d",
										)
									}
								>
									<Box
										size={
											14
										}
									/>
									3D
								</button>
								<button
									type="button"
									className={`btn btn-sm ${viewMode === "2d" ? "btn-primary" : "btn-ghost"}`}
									onClick={() =>
										setViewMode(
											"2d",
										)
									}
								>
									<Map
										size={
											14
										}
									/>
									2D
								</button>
							</div>
							<div
								className={
									styles.canvas
								}
							>
								{viewMode ===
								"3d" ? (
									<Viewer3D
										build={
											build
										}
									/>
								) : (
									<Viewer2D
										build={
											build
										}
									/>
								)}
							</div>
						</div>

						{/* Build metadata */}
						<section
							className={`card ${styles.metaCard}`}
						>
							<h2 className="section-heading">
								Build Info
							</h2>
							<BuildMeta
								build={build}
							/>
						</section>
					</div>

					{/* Right: materials */}
					<aside
						className={`card ${styles.sidebar}`}
					>
						<MaterialsList build={build} />
					</aside>
				</div>
			</div>
		</main>
	);
}
