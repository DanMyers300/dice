{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };
  outputs = { self, nixpkgs, ... }: let
    system = "x86_64-linux";
    pkgs = import nixpkgs {
      inherit system;
    };
  in {
    packages."${system}".default = pkgs.rustPlatform.buildRustPackage {
      pname = "dice";
      version = "0.0.1";

      src = ./.;

      cargoBuildOptions = [
        "--release"
      ];

      cargoHash = "";

      installPhase = ''
        cargo build --target-dir out/
        mkdir -p $out/bin
        cp target/x86_64-unknown-linux-gnu/release/dice $out/bin/
      '';

      meta = with pkgs.lib; {
        description = "Dice simulator";
        license = licenses.gpl3;
        maintainers = [ maintainers.dan ];
      };
    };

    devShell."${system}" = pkgs.mkShell {
      name = "dice";
      buildInputs = with pkgs; [
        cargo
        clippy
        rustc
      ];
    };
  };
}
