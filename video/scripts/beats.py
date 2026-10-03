"""Beat grid + energy curve of the music track (numpy only).

Usage: python3 beats.py <music.mp3> [bpm_hint]
Prints JSON: {bpm, offset, beats:[...], energy:[per 0.5 s RMS dB]}
"""
import json, subprocess, sys
import numpy as np

SR = 22050
path = sys.argv[1]
hint = float(sys.argv[2]) if len(sys.argv) > 2 else 112.0
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'],
                     capture_output=True, check=True).stdout
x = np.frombuffer(raw, dtype=np.float32)

# Spectral flux onset envelope
hop, win = 256, 1024
frames = np.lib.stride_tricks.sliding_window_view(x, win)[::hop] * np.hanning(win)
mag = np.abs(np.fft.rfft(frames, axis=1))
mag = np.log1p(10 * mag)
flux = np.maximum(0, np.diff(mag, axis=0)).sum(axis=1)
flux = flux - np.convolve(flux, np.ones(16) / 16, mode='same')
flux = np.maximum(flux, 0)
fps = SR / hop

# Tempo: autocorrelation around the hint
ac = np.correlate(flux, flux, mode='full')[len(flux) - 1:]
best, bpm = -1, hint
for b in np.arange(hint * 0.9, hint * 1.1, 0.05):
    lag = 60 / b * fps
    i = int(round(lag))
    v = ac[i] + 0.5 * ac[int(round(lag * 2))]
    if v > best:
        best, bpm = v, b
period = 60 / bpm

# Phase: maximise flux sampled on the grid
t_frames = np.arange(len(flux)) / fps
best, offset = -1, 0
for ph in np.arange(0, period, 0.005):
    idx = np.round((np.arange(ph, t_frames[-1], period)) * fps).astype(int)
    v = flux[idx[idx < len(flux)]].sum()
    if v > best:
        best, offset = v, ph
dur = len(x) / SR
beats = [round(float(t), 4) for t in np.arange(offset, dur, period)]

seg = int(SR * 0.5)
energy = [round(float(20 * np.log10(np.sqrt(np.mean(x[i:i + seg] ** 2)) + 1e-9)), 1) for i in range(0, len(x) - seg, seg)]
print(json.dumps({'bpm': round(float(bpm), 3), 'offset': round(float(offset), 4), 'duration': round(dur, 3), 'beats': beats, 'energy': energy}))
