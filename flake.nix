{
  description = "CET Backend";

  inputs = {
    self.submodules = true;

    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      nixpkgs,
      flake-utils,
      ...
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = (import nixpkgs) {
          inherit system;
        };
      in
      {
        packages = {
          # inherit
          # dev binaries
          # prod binaries
          # ;
        };

        # nix develop
        devShell = pkgs.mkShell {
          # TODO: better env
          shellHook = ''
            export DATABASE_URL=postgres://postgres:yourpassword@localhost:9009/postgres
          '';
          nativeBuildInputs = with pkgs; [
            # dev dps
            biome
            just
          ];
        };
      }
    );
}
