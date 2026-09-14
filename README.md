# ManzKind Cloud Sandbox
Cloud-ready host for exact HTML plugin payloads. The plugin executes on the iPhone/browser; the server serves the payload and collects optional test results.

Put the authoritative `ManzKind_v3.4.html` in `public/plugins/`. Do not reconstruct it.

The UI fixes a 1334x750 logical plugin stage, provides a device capability panel, client-visible JS memory where supported, FPS/browser runtime information, and a 1/2/4/8 worker scaling test.

Deploy to a Node 22 or Docker-capable cloud service and open the returned HTTPS URL on the iPhone. No Mac is required for the user.

Do not expose proprietary payloads publicly without authentication/TLS.
